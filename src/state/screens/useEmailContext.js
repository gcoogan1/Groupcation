import { useReducer, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { CognitoUser } from "amazon-cognito-identity-js";

import { UserContext } from "../userContext";
import {
  checkEmailExists,
  isUserConfirmed,
} from "../../util/aws/cognito/idServiceProvider";
import UserPool from "../../util/aws/cognito/cognito";
import {
  userExists,
  userIsConfirmed,
} from "../../util/firebase/firebaseServices";
import { sendResetPasswordCode } from "../../util/firebase/firebaseServices";

const initialState = {
  enteredEmail: "",
  emailIsValid: true,
  emailExists: false,
  isLoading: false,
  modalVisible: false,
  modalContent: { title: "", subTitle: "", buttons: {} },
};

const reducer = (emailState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...emailState, enteredEmail: action.payload };
    case "SET_LOADING":
      return { ...emailState, isLoading: action.payload };
    case "SET_EMAIL_VALIDITY":
      return { ...emailState, emailIsValid: action.payload };
    case "SET_EMAIL_EXISTS":
      return { ...emailState, emailExists: action.payload };
    case "SET_MODAL_CONTENT":
      return {
        ...emailState,
        modalContent: action.payload,
        modalVisible: true,
      };
    case "CLOSE_MODAL":
      return { ...emailState, modalVisible: false };
    case "RESET_EMAIL":
      return { ...emailState, enteredEmail: "" };
    default:
      return emailState;
  }
};

const useEmailContext = () => {
  const [emailState, dispatch] = useReducer(reducer, initialState);

  const userContext = useContext(UserContext);
  const navigation = useNavigation();

  // UTIL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const setInvalidInput = () => {
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_EMAIL_VALIDITY", payload: false });
  };

  const navigateToConfirm = () => {
    closeModal();
    setInvalidInput(false);
    navigation.navigate("Verification", { isResetPassword: true });
  };

  const handleAcknowledgeButton = () => {
    dispatch({ type: "RESET_EMAIL" });
    closeModal();
  };

  // MODAL CONTENT
  const setInvalidEmailModal = () => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        title: "Invalid Email Address",
        subTitle: "Please check the email and try again.",
        buttons: {
          vertical: {
            top: {
              label: "Okay",
              onPress: handleAcknowledgeButton,
              buttonType: "default",
              isLoading: false,
            },
          },
        },
      },
    });
  };

  const setUserUnconfirmedModal = () => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        title: "Account Not Verified",
        subTitle:
          "The account entered is not verified. Please verify the account to contiue.",
        buttons: {
          vertical: {
            top: {
              label: "Confirm Account",
              onPress: navigateToConfirm,
              buttonType: "default",
              isLoading: emailState.isLoading,
            },
          },
        },
      },
    });
  };

  const setRegisteredEmailModal = () => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        title: "Email Already Registered",
        subTitle:
          "Looks like this email is associated with an existing account. If you have an account, please log in.",
        buttons: {
          vertical: {
            top: {
              label: "Go to login",
              onPress: () => {
                closeModal();
                dispatch({ type: "SET_EMAIL_VALIDITY", payload: true });
                navigation.navigate("Login");
              },
              buttonType: "default",
              isLoading: false,
            },
            bottom: {
              label: "Dismiss",
              onPress: handleAcknowledgeButton,
              buttonType: "tertiary",
              isLoading: false,
            },
          },
        },
      },
    });
  };

  // INPUT HANDLERS
  const updateInputValueHandler = (enteredVal) => {
    userContext.updateUser("email", enteredVal);
    dispatch({ type: "UPDATE_INPUT", payload: enteredVal });
  };

  const forgotPasswordHandler = async () => {
    try {
      const resentCodeRes = await sendResetPasswordCode(
        emailState.enteredEmail
      );

      if (resentCodeRes.status === 200) {
        navigation.navigate("Verification", { isResetPassword: true });
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      setInvalidEmailModal();
      setInvalidInput();
      return;
    } catch (error) {
      console.error(error);
      setInvalidEmailModal();
      setInvalidInput();
    }
  };

  const navigateToNextScreen = async (isResetPassword) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const isValid =
      emailState.enteredEmail && emailState.enteredEmail.includes("@");

    if (!isValid) {
      setInvalidEmailModal();
      setInvalidInput();
      return;
    }

    const emailAlreadyExists = await userExists(emailState.enteredEmail);
    if (emailAlreadyExists) {
      const confirmedUser = await userIsConfirmed(emailState.enteredEmail);

      if (!confirmedUser) {
        setUserUnconfirmedModal();
        return;
      }

      if (isResetPassword) {
        forgotPasswordHandler();
        return;
      }

      setRegisteredEmailModal();
      setInvalidInput();
      dispatch({ type: "SET_EMAIL_EXISTS", payload: true });
      return;
    }

    if (isResetPassword) {
      setInvalidEmailModal();
      setInvalidInput();
      dispatch({ type: "SET_EMAIL_EXISTS", payload: true });
      return;
    }

    dispatch({ type: "SET_EMAIL_VALIDITY", payload: true });
    dispatch({ type: "SET_LOADING", payload: false });
    navigation.navigate("Name");
  };

  return {
    emailState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
  };
};

export default useEmailContext;
