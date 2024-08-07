import { Modal, View } from "react-native";

import InputText from "../../../../components/Inputs/InputText/InputText";
import FormGroup from "../../../../components/FormGroup/FormGroup";
import Dialog from "../../../../components/Dialog/Dialog";
import useNameContext from "../../../../state/screens/useNameContext";

const NameScreen = () => {
  const {
    nameState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
    clearInputHandler
  } = useNameContext();

  const actionButtons = {
    vertical: {
      top: {
        label: "Continue",
        onPress: navigateToNextScreen,
        buttonType: "primary",
        isLoading: nameState.isLoading,
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
          isValid={nameState.credentialsInvalid.firstName.isValid}
          onUpdateValue={(val) => updateInputValueHandler("enteredFirstName", val)}
          errorMessage={nameState.credentialsInvalid.firstName.errorMessage}
          showClear={true}
          clearInput={() => clearInputHandler("enteredFirstName")}
        />
        <InputText
          inputLabel={"Last Name"}
          inputName="lastName"
          isValid={nameState.credentialsInvalid.lastName.isValid}
          onUpdateValue={(val) => updateInputValueHandler("enteredLastName", val)}
          errorMessage={nameState.credentialsInvalid.lastName.errorMessage}
          showClear={true}
          clearInput={() => clearInputHandler("enteredLastName")}
        />
      </FormGroup>
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameState.modalVisible}
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
            title={nameState.modalContent.title}
            subTitle={nameState.modalContent.subTitle}
            footerButtons={nameState.modalContent.buttons}
          />
        </View>
      </Modal>
    </View>
  );
};

export default NameScreen;
