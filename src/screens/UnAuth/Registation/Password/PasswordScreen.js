import { Modal, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import PasswordConstants from "./constants/Password.constants";
import InputPassword from "../../../../components/Inputs/InputPassword/InputPassword";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";
import usePasswordContext from "../../../../state/screens/usePasswordContext";

const PasswordScreen = () => {
  const {
    passwordState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
  } = usePasswordContext();
  const route = useRoute();

  const actionButtons = {
    vertical: {
      top: {
        label: route?.params?.isResetPassword  ? "Create New Password" : "Continue",
        onPress: navigateToNextScreen,
        buttonType: "primary",
        isLoading: passwordState.isLoading,
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={route?.params?.isResetPassword ? "Create a New Password" : "Almost Done"}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputPassword
          inputLabel={"Create Password"}
          inputName="password"
          onUpdateValue={(val) => updateInputValueHandler(val)}
          helperText={"Password is required to have a minimum of:"}
          helperTextData={PasswordConstants.PASSWORD_REQUIREMENTS}
          isValid={passwordState.passwordIsValid}
          errorMessage={
            (passwordState?.enteredPassword?.length === 0)
              ? "Please create a password"
              : "Please make sure password meets minimum requirements."
          }
        />
      </FormGroup>
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordState.modalVisible}
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
            title={passwordState.modalContent.title}
            subTitle={passwordState.modalContent.subTitle}
            footerButtons={passwordState.modalContent.buttons}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PasswordScreen;
