import { useReducer, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../userContext";
import { containsSpecialChar, nameIsValid, removeWhitespace } from "../../util/helperFunctions/helperFunctions";

const initialState = {
  enteredFirstName: "",
  enteredLastName: "",
  isLoading: false,
  modalVisible: false,
  credentialsInvalid: {
    firstName: { isValid: true, errorMessage: "" },
    lastName: { isValid: true, errorMessage: "" },
  },
  modalContent: { title: "", subTitle: "", buttons: {} }
};

const reducer = (nameState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...nameState, [action.payload.inputType]: action.payload.value };
    case "SET_LOADING":
      return { ...nameState, isLoading: action.payload };
    case "SET_CREDENTIALS_INVALID":
      return { ...nameState, credentialsInvalid: action.payload };
    case "SET_MODAL_CONTENT":
      return { ...nameState, modalContent: action.payload, modalVisible: true };
    case "CLOSE_MODAL":
      return { ...nameState, modalVisible: false };
    default:
      return nameState;
  }
};

const useNameContext = () => {
  const [nameState, dispatch] = useReducer(reducer, initialState);
  const userContext = useContext(UserContext);
  const navigation = useNavigation();

  // UTIL
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handleAcknowledgeButton = () => {
    closeModal();
    if (!nameState.credentialsInvalid.firstName.isValid) {
      dispatch({ type: "UPDATE_INPUT", payload: { enteredFirstName: '' } });
    }
    if (!nameState.credentialsInvalid.lastName.isValid) {
      dispatch({ type: "UPDATE_INPUT", payload: { enteredLastName: '' } });
    }
  };

  // BUTTON CONTENT
  const invalidButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: handleAcknowledgeButton,
        buttonType: "default",
        isLoading: nameState.isLoading,
      },
    },
  };

  // INPUT HANDLERS
  const updateInputValueHandler = (inputType, enteredVal) => {
    const formattedVal = removeWhitespace(enteredVal);

    dispatch({ type: "UPDATE_INPUT", payload: { inputType, value: formattedVal } });
    userContext.updateUser(inputType, formattedVal);
  };

  const clearInputHandler = (inputType) => {
    dispatch({ type: "UPDATE_INPUT", payload: { inputType, value: '' } });
  }

  const navigateToNextScreen = () => {

    const firstIsValid = nameIsValid(nameState.enteredFirstName);
    const lastIsValid = nameIsValid(nameState.enteredLastName);

    dispatch({ type: "SET_LOADING", payload: true });

    if (!firstIsValid || !lastIsValid) {
      const firstErrorMessage = containsSpecialChar(nameState.enteredFirstName)
        ? "First name cannot contain numbers or special characters."
        : "Please enter your first name.";
      const lastErrorMessage = containsSpecialChar(nameState.enteredLastName)
        ? "Last name cannot contain numbers or special characters."
        : "Please enter your last name.";

      dispatch({
        type: "SET_CREDENTIALS_INVALID",
        payload: {
          firstName: { isValid: firstIsValid, errorMessage: firstErrorMessage },
          lastName: { isValid: lastIsValid, errorMessage: lastErrorMessage },
        },
      });

      const specialCharactersError = containsSpecialChar(nameState.enteredFirstName) || containsSpecialChar(nameState.enteredLastName);

      const modalContent = {
        title: specialCharactersError ? "Invalid Name" : "No Name Entered",
        subTitle: specialCharactersError
          ? "Names cannot contain numbers or special characters."
          : "Please enter your first and last name.",
        buttons: invalidButtons,
      };

      dispatch({ type: "SET_MODAL_CONTENT", payload: modalContent });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: false });
    navigation.navigate("Password");
  };

  return {
    nameState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
    clearInputHandler
  };
};

export default useNameContext;
