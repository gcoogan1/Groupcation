import { useReducer, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { AuthContext } from "../authContext";
import loginConstants from "../../screens/UnAuth/Login/constants/Login.constants";
import { loginUser } from "../../util/firebase/firebaseServices";
import { UserContext } from "../userContext";

const initialState = {
  email: "",
  password: "",
  credentialsInvalid: {
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
  },
  isLoading: false,
  modalVisible: false,
  modalContent: { title: "", subTitle: "", buttons: {} },
};

const reducer = (authState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...authState, [action.payload.inputType]: action.payload.value };
    case "SET_LOADING":
      return { ...authState, isLoading: action.payload };
    case "SET_CREDENTIALS_VALIDITY":
      return { ...authState, credentialsInvalid: action.payload };
    case "SET_MODAL_CONTENT":
      return { ...authState, modalContent: action.payload, modalVisible: true };
    case "CLOSE_MODAL":
      return { ...authState, modalVisible: false };
    default:
      return authState;
  }
};

const useLoginContext = () => {
  const [authState, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { ERROR_MODALS } = loginConstants;

  // UTIL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const setInvalidInput = (validity) => {
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({
      type: "SET_CREDENTIALS_VALIDITY",
      payload: {
        email: { isValid: validity, errorMessage: "" },
        password: { isValid: validity, errorMessage: "" },
      },
    });
  };

  const clearEmailInput = (inputType) => {
    dispatch({
      type: "UPDATE_INPUT",
      payload: { inputType, value: "" },
    });
  };

  const navigateToConfirm = () => {
    closeModal();
    setInvalidInput(false);
    navigation.navigate("Verification");
  };

  // BUTTON CONTENT
  const invalidButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: closeModal,
        buttonType: "default",
        isLoading: authState.isLoading,
      },
    },
  };

  const confimAccountButtons = {
    vertical: {
      top: {
        label: "Confirm Account",
        onPress: navigateToConfirm,
        buttonType: "default",
        isLoading: authState.isLoading,
      },
    },
  };

  // MODAL CONTENT
  const setContentModal = (type) => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        ...ERROR_MODALS[type],
        buttons: type === "notVerified" ? confimAccountButtons : invalidButtons,
      },
    });
  };

  // INPUT HANDLERS
  const updateInputValueHandler = (inputType, enteredVal) => {
    userContext.updateUser(inputType, enteredVal);
    dispatch({
      type: "UPDATE_INPUT",
      payload: { inputType, value: enteredVal },
    });
  };

  const loginHandler = async () => {
    try {
      const response = await loginUser(authState.email, authState.password);
      const { status } = response;

      // SUCCESS
      if (status === 200) {
        authContext.authenticate(response.data);
        setInvalidInput(true);
        return;
      }

      // ERRORS
      if (status === 404) {
        setContentModal("notVerified");
        return;
      }

      if (status === 400) {
        setContentModal("incorrectCreds");
        setInvalidInput(false);
        return;
      }

      setContentModal("verifyFailed");
      return;
    } catch (error) {
      setContentModal("verifyFailed");
      return;
    }
  };

  const navigateToNextScreen = () => {
    emailMissing = !authState.email || authState.email.length === 0;
    passwordMissing = !authState.password || authState.password.length === 0;

    dispatch({ type: "SET_LOADING", payload: true });
    if (emailMissing || passwordMissing) {
      setContentModal("missingCreds");
      dispatch({
        type: "SET_CREDENTIALS_VALIDITY",
        payload: {
          email: {
            isValid: !emailMissing,
            errorMessage: "Please enter a valid email address.",
          },
          password: {
            isValid: !passwordMissing,
            errorMessage: "Please enter your password.",
          },
        },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    const isValid = authState.email && authState.email.includes("@");

    if (!isValid) {
      setContentModal("invalidEmail");
      dispatch({
        type: "SET_CREDENTIALS_VALIDITY",
        payload: {
          email: {
            isValid: isValid,
            errorMessage: "Please enter a valid email address",
          },
          password: {
            isValid: authState.credentialsInvalid.password.isValid,
            errorMessage: "Please enter your password.",
          },
        },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    loginHandler();
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return {
    authState,
    updateInputValueHandler,
    navigateToNextScreen,
    clearEmailInput,
  };
};

export default useLoginContext;
