import { Modal, View } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../../../state/userContext";
import InputCode from "../../../../components/Inputs/InputCode/InputCode";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";
import useVerificationContext from "../../../../state/screens/useVerificationContext";

const VerificationScreen = () => {
  const {
    verificationState,
    updateInputValueHandler,
    navigateToNextScreen,
    handleResendCode,
    closeModal
  } = useVerificationContext();

  const userContext = useContext(UserContext);

  const { email } = userContext.user;

  const INFO_MESSAGE = `A verification code has been sent to your email address, ${email}. Please check your inbox, including the spam folder, and enter the code below.`;

  const actionButtons = {
    vertical: {
      top: {
        label: verificationState.isLoading.isVerifying ? "Verifying..." : "Verify Email",
        onPress: () => navigateToNextScreen(),
        buttonType: "primary",
        isLoading: verificationState.isLoading.isVerifying,
      },
      bottom: {
        label: "Resend Code",
        onPress: () => handleResendCode(),
        buttonType: "tertiary",
        isLoading: verificationState.isLoading.resendIsLoading,
      },
    },
  };


  return (
    <View style={{ flex: 1 }}>
      <FormGroup
        formHeader={"Check you email"}
        formSubHeader={INFO_MESSAGE}
        footerButtons={actionButtons}
        footerLayout={"vertical"}
        density={"compact"}
      >
        <InputCode
          inputLabel={"Verification Code"}
          inputName={"verification"}
          onUpdateValue={(val) => updateInputValueHandler(val)}
          isValid={verificationState.codeIsValid}
          errorMessage={
            (verificationState.enteredCode.length === 0) ? "Please enter the code" : "Incorrect Code"
          }
        />
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={verificationState.modalVisible}
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
                title={verificationState.modalContent.title}
                subTitle={verificationState.modalContent.subTitle}
                footerButtons={verificationState.modalContent.buttons}
              />
            </View>
          </Modal>
        </>
      </FormGroup>
    </View>
  );
};

export default VerificationScreen;
