import { Modal, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import InputText from "../../../../components/Inputs/InputText/InputText";
import SocialLogin from "../../../../components/SocialLogin/SocialLogin";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";
import useEmailContext from "../../../../state/screens/useEmailContext";

const EmailScreen = ({ isResetPassword }) => {
  const {
    emailState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal
  } = useEmailContext();

  const route = useRoute()

  const actionButtons = {
    vertical: {
      top: {
        label: "Continue",
        onPress: () => navigateToNextScreen(route?.params?.isResetPassword),
        buttonType: "primary",
        isLoading: emailState.isLoading,
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={route?.params?.isResetPassword ? "Reset Password" : "What's your email?"}
        formSubHeader={"Enter the email address you signed up with."}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputText
          inputLabel={"Email Address"}
          inputName="email"
          isValid={emailState.emailIsValid}
          onUpdateValue={updateInputValueHandler}
          errorMessage={"Please enter a valid email address."}
          keyboardType={"email"}
          showClear={true}
        />
        {!route?.params?.isResetPassword && <SocialLogin /> }
      </FormGroup>
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailState.modalVisible}
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
            title={emailState.modalContent.title}
            subTitle={emailState.modalContent.subTitle}
            footerButtons={emailState.modalContent.buttons}
          />
        </View>
      </Modal>
    </View>
  );
};

export default EmailScreen;
