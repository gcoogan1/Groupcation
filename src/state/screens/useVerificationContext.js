import { useReducer, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { UserContext } from "../userContext";
import { AuthContext } from "../authContext";
import UserPool from "../../util/aws/cognito/cognito"
import verificationConstants from "../../screens/UnAuth/Registation/Verification/constants/verification.constants";

const initialState = {
  enteredCode: "",
  codeIsValid: true,
  isLoading: {
    isVerifiying: false,
    isResending: false,
  },
  modalVisible: false,
  modalContent: { title: "", subTitle: "", buttons: {} },
};

const reducer = (verificationState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...verificationState, enteredCode: action.payload };
    case "SET_LOADING":
      return { ...verificationState, isLoading: action.payload };
    case "SET_VERIFICATION_VALIDITY":
      return { ...verificationState, codeIsValid: action.payload };
    case "SET_MODAL_CONTENT":
      return {
        ...verificationState,
        modalContent: action.payload,
        modalVisible: true,
      };
    case "CLOSE_MODAL":
      return { ...verificationState, modalVisible: false };
    default:
      return verificationState;
  }
};

const useVerificationContext = () => {
  const [verificationState, dispatch] = useReducer(reducer, initialState);

  const navigation = useNavigation();
  const route = useRoute()
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { email, password } = userContext.user;
  const { ERROR_MODALS } = verificationConstants;

  const user = new CognitoUser({
    Username: email,
    Pool: UserPool,
  });

  // UTIL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const resetIsVerifiying = () => {
    dispatch({
      type: "SET_LOADING",
      payload: { isVerifiying: false, isResending: false },
    });
  };

  const handleVerificationError = (error) => {
    console.error(error);
    resetIsVerifiying();
    setContentModal("verifyFailed");
  };

  // BUTTON CONTENT
  const invalidButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: closeModal,
        buttonType: "default",
        isLoading: verificationState.isLoading.isVerifying,
      },
    },
  };

  const incorrectCodeButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: closeModal,
        buttonType: "default",
        isLoading: verificationState.isLoading.isVerifying,
      },
    },
    bottom: {
      label: "Resend Code",
      onPress: handleResendCode,
      buttonType: "tertiary",
      isLoading: verificationState.isLoading.isResending,
    },
  };

  // MODAL CONTENT
  const setContentModal = (type) => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        ...ERROR_MODALS[type],
        buttons:
          type === "incorrectCode" ? incorrectCodeButtons : invalidButtons,
      },
    });
  };

  //INPUT HANDLERS
  const updateInputValueHandler = (enteredVal) => {
    dispatch({
      type: "UPDATE_INPUT",
      payload: enteredVal,
    });
    userContext.updateUser(enteredVal);
  };

  const handleResendCode = () => {
    dispatch({
      type: "SET_LOADING",
      payload: { isVerifiying: false, isResending: true },
    });
    try {
      user.resendConfirmationCode((err, data) => {
        if (err.code === "LimitExceededException") {
          setContentModal("resendUnavailable");
          dispatch({
            type: "SET_LOADING",
            payload: { isVerifiying: false, isResending: false },
          });
          return;
        }

        setContentModal("resendConfirm");
        dispatch({
          type: "SET_LOADING",
          payload: { isVerifiying: false, isResending: false },
        });
      });
    } catch (error) {
      setContentModal("resendUnavailable");
      dispatch({
        type: "SET_LOADING",
        payload: { isVerifiying: false, isResending: false },
      });
    }
  };

  const navigateToNextScreen = () => {
    dispatch({
      type: "SET_LOADING",
      payload: { isVerifiying: true, isResending: false },
    });

    //NO CODE
    if (verificationState.enteredCode.length === 0) {
      dispatch({ type: "SET_EMAIL_VALIDITY", payload: false });
      setContentModal("noCode");
      resetIsVerifiying();
      return;
    }

    try {
      user.confirmRegistration(verificationState.enteredCode, true, function (err, result) {
        if (err) {
          if (route?.params?.isResetPassword && err.code === "NotAuthorizedException") {
            navigation.navigate("Password", { isResetPassword: true })
            return;
          }
          resetIsVerifiying();
          
          setContentModal(err.code === "CodeMismatchException" ? "incorrectCode" : "maxAttempts");
          return;
        }
        

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });
        
        try {
          user.authenticateUser(authDetails, {
            onSuccess: (data) => {
              const accessToken = data.getAccessToken().getJwtToken();

              authContext.authenticate(accessToken);
              resetIsVerifiying();
              navigation.navigate("home");
            },
            onFailure: handleVerificationError,
          });
        } catch (error) {
          handleVerificationError(error);
        }
      });
    } catch (error) {
      handleVerificationError(error);
    }
  };

  return {
    verificationState,
    updateInputValueHandler,
    navigateToNextScreen,
    handleResendCode,
    closeModal,
  };
};

export default useVerificationContext;
