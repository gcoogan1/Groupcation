import { useReducer, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { UserContext } from "../userContext";
import { AuthContext } from "../authContext";
import UserPool from "../../util/aws/cognito/cognito";
import verificationConstants from "../../screens/UnAuth/Registation/Verification/constants/verification.constants";
import {
  validateVerificationCode,
  sendConfirmationEmail,
  userIsConfirmed,
  loginUser,
} from "../../util/firebase/firebaseServices";

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
  const route = useRoute();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { email, password } = userContext.user;
  const { ERROR_MODALS } = verificationConstants;

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

  const handleResendCode = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: { isVerifiying: false, isResending: true },
    });
    try {
      const resendCodeRes = await sendConfirmationEmail(email);

      dispatch({
        type: "SET_LOADING",
        payload: { isVerifiying: false, isResending: false },
      });

      if (resendCodeRes.status === 200) {
        setContentModal("resendConfirm");
        return;
      }
      return setContentModal("resendUnavailable");
    } catch (error) {
      setContentModal("resendUnavailable");
      dispatch({
        type: "SET_LOADING",
        payload: { isVerifiying: false, isResending: false },
      });
    }
  };

  const navigateToNextScreen = async () => {
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
      const userIsVerified = await userIsConfirmed(email);

      if (route?.params?.isResetPassword && userIsVerified) {
        const resetConfirmRes = await validateVerificationCode(
          email,
          verificationState.enteredCode,
          "resetPasswordCodes"
        );

        if (resetConfirmRes.status === 200) {
          navigation.navigate("Password", { isResetPassword: true });
          return;
        }
        resetIsVerifiying();
        setContentModal(
          signUpConfirmRes.status === 429 ? "maxAttempts" : "incorrectCode"
        );
        return;
      }

      const signUpConfirmRes = await validateVerificationCode(
        email,
        verificationState.enteredCode,
        "verificationCodes"
      );

      if (signUpConfirmRes.status === 200) {
        if (!password) {
          resetIsVerifiying();
          navigation.navigate("Login");
        }
        const loginRes = await loginUser(email, password);
        const { status } = loginRes;

        // SUCCESS
        if (status === 200) {
          authContext.authenticate(loginRes.data);
          resetIsVerifiying();
          navigation.navigate("ExploreScreen");
          return;
        }

        handleVerificationError(loginRes);
        return;
      }

      resetIsVerifiying();
      setContentModal(
        signUpConfirmRes.status === 429 ? "maxAttempts" : "incorrectCode"
      );
      return;
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
