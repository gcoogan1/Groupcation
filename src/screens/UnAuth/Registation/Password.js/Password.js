import { Modal, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../../../state/userContext";
import InputPassword from "../../../../components/Inputs/InputPassword/InputPassword";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";

const PasswordScreen = () => {
  const [enteredPassword, setEnteredPassword] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const userContext = useContext(UserContext);
  const navigation = useNavigation();

  const updateInputValueHandler = (enteredVal) => {
    userContext.updateUser("password", enteredVal);
    setEnteredPassword(enteredVal);
  };
 
  const isPasswordValid = (password) => {

    if (!password || password?.length < 0) {
      setIsEmpty(true)
      return false
    }

    setIsEmpty(false);
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      password
    );
  };

  const navigateToNextScreen = () => {

    const isValid = isPasswordValid(enteredPassword);

    setIsLoading(true);
    if (!isValid) {
      setPasswordIsValid(false);
      setIsLoading(false);
      return;
    }
    setPasswordIsValid(true);
    setIsLoading(false);
    navigation.navigate("Verification");
  };


  const actionButtons = {
    vertical: {
      top: {
        label: "Create Account",
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

  const passwordRequirments = [
    {
      id: 1,
      title: "8 characters in length",
    },
    {
      id: 2,
      title: "1 uppercase letter",
    },
    {
      id: 3,
      title: "1 lowercase letter",
    },
    {
      id: 4,
      title: "1 number",
    },
    {
      id: 5,
      title: "1 special character",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={"Almost Done"}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputPassword
          inputLabel={"Create Password"}
          inputName="password"
          onUpdateValue={(val) => updateInputValueHandler(val)}
          helperText={"Password is required to have a minimum of:"}
          helperTextData={passwordRequirments}
          isValid={passwordIsValid}
          errorMessage={
            isEmpty
              ? "Please create a password"
              : "Please make sure password meets minimum requirements."
          }
        />
      </FormGroup>
      {!passwordIsValid && (
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
              {isEmpty ? (
                <Dialog
                  title={"No Password Entered"}
                  subTitle={"Please create a password."}
                  footerButtons={invalidButtons}
                />
              ) : (
                <Dialog
                  title={"Invalid Password"}
                  subTitle={
                    "Password does not meet minimum requirements. Please try again."
                  }
                  footerButtons={invalidButtons}
                />
              )}
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

export default PasswordScreen;
