import { Modal, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../../../state/userContext";
import InputText from "../../../../components/Inputs/InputText/InputText";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";
import {
  containsSpecialChar,
  nameIsValid,
} from "../../../../../util/helperFunctions/helperFunctions";

const Name = () => {
  const userContext = useContext(UserContext);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstName: {
      isValid: true,
      errorMessage: ""
    },
    lastName: {
      isValid: true,
      errorMessage: "",
    },
  });

  const updateInputValueHandler = (inputType, enteredVal) => {
    if (inputType === "firstName") {
      userContext.updateUser(inputType, enteredFirstName);
      setEnteredFirstName(enteredVal);
    }
    if (inputType === "lastName") {
      userContext.updateUser(inputType, enteredLastName);
      setEnteredLastName(enteredVal);
    }
    return;
  };

  const navigateToNextScreen = () => {
    const firstIsValid = nameIsValid(enteredFirstName);
    const lastIsValid = nameIsValid(enteredLastName);

    setIsLoading(true);

    if (!firstIsValid || !lastIsValid) {
      setCredentialsInvalid({
        firstName: {
          isValid: firstIsValid,
          errorMessage:
            containsSpecialChar(enteredFirstName) ?
            "Name cannot contain numbers or special characters." : "Please enter your first name."
        },
        lastName: {
          isValid: lastIsValid,
          errorMessage:
            containsSpecialChar(enteredLastName) ?
            "Name cannot contain numbers or special characters." : "Please enter your first name.",
        },
      });

      setIsLoading(false);
      setModalVisible(true);
      return;
    }

    setIsLoading(false);
    navigation.navigate("Password");
  };

  const actionButtons = {
    vertical: {
      top: {
        label: "Continue",
        onPress: () => navigateToNextScreen(),
        buttonType: "primary",
        isLoading: isLoading,
      },
    },
  };

  const invalidButtons = {
    vertical: {
      top: {
        label: "Okay",
        onPress: () => setModalVisible(false),
        buttonType: "default",
        isLoading: isLoading,
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={"What's your name?"}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputText
          inputLabel={"First Name"}
          inputName="firstName"
          isValid={credentialsInvalid.firstName.isValid}
          onUpdateValue={(val) => updateInputValueHandler("firstName", val)}
          errorMessage={credentialsInvalid.firstName.errorMessage}
          showClear={true}
        />
        <InputText
          inputLabel={"Last Name"}
          inputName="lastName"
          isValid={credentialsInvalid.lastName.isValid}
          onUpdateValue={(val) => updateInputValueHandler("lastName", val)}
          errorMessage={credentialsInvalid.lastName.errorMessage}
          showClear={true}
        />
      </FormGroup>
      {(!credentialsInvalid.firstName.isValid || !credentialsInvalid.lastName.isValid) && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 200,
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            >
              <Dialog
                title={"Name Not Entered"}
                subTitle={"Please enter your first and last name."}
                footerButtons={invalidButtons}
              />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default Name;
