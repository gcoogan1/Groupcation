import { useReducer, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { UserContext } from "../userContext";
import UserPool from "../../util/aws/cognito/cognito"
import { isPasswordValid, removeWhitespace } from "../../util/helperFunctions/helperFunctions";

const initialState = {
  enteredPassword: "",
  passwordIsValid: true,
  isLoading: false,
  modalVisible: false,
  modalContent: { title: "", subTitle: "", buttons: {} },
};

const reducer = (passwordState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...passwordState, enteredPassword: action.payload };
    case "SET_LOADING":
      return { ...passwordState, isLoading: action.payload };
    case "SET_PASSWORD_VALIDITY":
      return { ...passwordState, passwordIsValid: action.payload };
    case "SET_MODAL_CONTENT":
      return {
        ...passwordState,
        modalContent: action.payload,
        modalVisible: true,
      };
    case "CLOSE_MODAL":
      return { ...passwordState, modalVisible: false };
    case "RESET_PASSWORD":
      return { ...passwordState, enteredPassword: "" };
    default:
      return passwordState;
  }
};

const usePasswordContext = () => {
  const [passwordState, dispatch] = useReducer(reducer, initialState);

  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();

  // UTIL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const setInvalidInput = () => {
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_PASSWORD_VALIDITY", payload: false });
  }

  // BUTTON CONTENT
  const invalidButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: closeModal,
        buttonType: "default",
        isLoading: passwordState.isLoading,
      },
    },
  };

  // MODAL CONTENT  
  const setInvalidPasswordModal = () => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        title: "Invalid Password",
        subTitle: "Password does not meet minimum requirements. Please try again.",
        buttons: invalidButtons,
      },
    });
  };

  const setEmptyPasswordModal = () => {
    dispatch({
      type: "SET_MODAL_CONTENT",
      payload: {
        title: "No Password Entered",
        subTitle: "Please create a password.",
        buttons: invalidButtons
      },
    });
  };

  // INPUT HANDLERS
  const updateInputValueHandler = (enteredVal) => {
    const formatedVal = removeWhitespace(enteredVal);
    
    userContext.updateUser("password", formatedVal);
    dispatch({ type: "UPDATE_INPUT", payload: enteredVal });
  };

  const signUpHandler = async () => {
    try {
      const { email, firstName, lastName, password } = userContext.user
      UserPool.signUp(email, password, [{ Name: 'name', Value: `${firstName} ${lastName}` }], null, (err, data) => {
        if (err) {
          console.log("ERROR", err);
        }
      })
    } catch (error) {
      console.log("ERROR Try", error);
    }
  }

  const navigateToNextScreen = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    if (passwordState.enteredPassword.length === 0) {
      setEmptyPasswordModal()
      setInvalidInput()
      return;
    }

    const isValid = isPasswordValid(passwordState.enteredPassword)

    if (!isValid) {
      setInvalidPasswordModal();
      setInvalidInput()
      return;
    }

    dispatch({ type: "SET_PASSWORD_VALIDITY", payload: true });
    dispatch({ type: "SET_LOADING", payload: false });
    if (route?.params?.isResetPassword) {
      navigation.navigate("ResetSuccess")
      return;
    }
    signUpHandler();
    navigation.navigate("Verification");
  };

  return {
    passwordState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
  };
};

export default usePasswordContext;
