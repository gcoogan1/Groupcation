import { Modal, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputText from "../../../components/Inputs/InputText/InputText";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import FormGroup from "../../../components/FormGroup/FormGroup";
import Dialog from "../../../components/Dialog/Dialog";
import useLoginContext from "../../../state/screens/useLoginContext";
import InputPassword from "../../../components/Inputs/InputPassword/InputPassword";
import InlineButton from "../../../components/InlineButton/InlineButton";

const LoginScreen = () => {
  const {
    authState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
    clearEmailInput
  } = useLoginContext();
  const navigation = useNavigation();
  

  const actionButtons = {
    vertical: {
      top: {
        label: authState.isLoading ? "Logging in..." : "Log In",
        onPress: navigateToNextScreen,
        buttonType: "primary",
        isLoading: authState.isLoading,
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={"Login"}
        formSubHeader={"Welcome Back!"}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputText
          inputLabel={"Email Address"}
          inputName="email"
          isValid={authState.credentialsInvalid.email.isValid}
          onUpdateValue={(val) => updateInputValueHandler("email", val)}
          errorMessage={authState.credentialsInvalid.email.errorMessage}
          keyboardType={"email"}
          clearInput={() => clearEmailInput('email')}
          showClear={true}
        />
        <InputPassword
          inputLabel={"Password"}
          inputName="password"
          onUpdateValue={(val) => updateInputValueHandler("password",val)}
          isValid={authState.credentialsInvalid.password.isValid}
          errorMessage={authState.credentialsInvalid.password.errorMessage}
        />

       <InlineButton 
          buttonType="secondary"
          onPress={() => navigation.navigate('Email', { isResetPassword: true })}
          styles={{ alignSelf: 'flex-end'}}
        >
          Forgot Password?
        </InlineButton>

        <SocialLogin />
      </FormGroup>
      <Modal
        animationType="slide"
        transparent={true}
        visible={authState.modalVisible}
        onRequestClose={closeModal}
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
            title={authState.modalContent.title}
            subTitle={authState.modalContent.subTitle}
            footerButtons={authState.modalContent.buttons}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
