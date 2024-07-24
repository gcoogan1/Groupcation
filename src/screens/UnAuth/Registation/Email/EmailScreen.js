import { Modal, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../../../state/userContext";
import InputText from "../../../../components/Inputs/InputText/InputText";
import SocialLogin from "../../../../components/SocialLogin/SocialLogin";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";

const EmailScreen = () => {
  const [enteredEmail, setEnteredEmail] = useState();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailExists, setEmailExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const userContext = useContext(UserContext);
  const navigation = useNavigation();

  const updateInputValueHandler = (enteredVal) => {
    userContext.updateUser("email", enteredVal);
    setEnteredEmail(enteredVal);
  };

  const navigateToNextScreen = () => {
    setIsLoading(true);
    const isValid = enteredEmail && enteredEmail.includes("@");
    
    if (!isValid) {
      setEmailIsValid(false);
      setIsLoading(false);
      setModalVisible(true);
      return;
    }
    setEmailIsValid(true);
    navigation.navigate("Name");
    setIsLoading(false);
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

  const registeredButtons = {
    vertical: {
      top: {
        label: "Go to login",
        onPress: () => navigation.navigate("Login"),
        buttonType: "default",
        isLoading: isLoading,
      },
      bottom: {
        label: "Dismiss",
        onPress: () => setEmailIsValid(true),
        buttonType: "tertiary",
        isLoading: isLoading,
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={"What's your email?"}
        formSubHeader={"This will be used to create your account"}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputText
          inputLabel={"Email Address"}
          inputName="email"
          isValid={emailIsValid}
          onUpdateValue={(val) => updateInputValueHandler(val)}
          errorMessage={"Please enter a valid email address."}
          keyboardType={"email"}
          showClear={true}
        />
        <SocialLogin />
      </FormGroup>
      {!emailIsValid && (
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
              {emailExists ? (
                <Dialog
                  title={"Email Already Registered"}
                  subTitle={
                    "Looks like this email is associated with an existing account. If you have an account, please log in."
                  }
                  footerButtons={registeredButtons}
                />
              ) : (
                <Dialog
                  title={"Invalid Email Address"}
                  subTitle={"Please check the email and try again."}
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

export default EmailScreen;
