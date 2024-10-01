import { View, ScrollView } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../../state/userContext";
import { theme } from "../../../styles/theme";
import { profileModalStyles } from "./styles/ProfileModal.styles";
import Add from "../../../../assets/icons/Add.svg";
import Avatar from "../../../components/Avatar/Avatar";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/Inputs/InputText/InputText";
import FormGroup from "../../../components/FormGroup/FormGroup";
import useNameContext from "../../../state/screens/useNameContext";

const ProfileModal = () => {
  const exisitingUser = useContext(UserContext);

  const {
    nameState,
    updateInputValueHandler,
    navigateToNextScreen,
    closeModal,
    clearInputHandler,
  } = useNameContext();

  console.log(exisitingUser.user)

  const actionButtons = {
    vertical: {
      top: {
        label: "Save",
        onPress: () => console.log("pressed"),
        buttonType: "primary",
        // isLoading: nameState.isLoading,
      },
    },
  };

  return (
    <ScrollView>
      <View style={profileModalStyles.container}>
        <View style={profileModalStyles.imageContainer}>
          <Avatar
            avatarImage={{
              uri: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg",
            }}
            size="profile"
            styles={{ ...theme.border.radius.md }}
          />
          <Button
            buttonSize={"sm"}
            onPress={() => console.log("Pressed!")}
            buttonType={"secondary"}
            styles={{ width: 150 }}
            iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
          >
            Add image
          </Button>
        </View>
        <View style={profileModalStyles.inputsContainer}>
          <FormGroup
            footerButtons={actionButtons}
            footerLayout={"vertical"}
            density={"compact"}
          >
            <InputText
              inputLabel={"First Name"}
              inputName="firstName"
              isValid={nameState.credentialsInvalid.firstName.isValid}
              onUpdateValue={(val) =>
                updateInputValueHandler("enteredFirstName", val)
              }
              errorMessage={nameState.credentialsInvalid.firstName.errorMessage}
              showClear={true}
              placeholder={exisitingUser.user.enteredFirstName}
              clearInput={() => clearInputHandler("enteredFirstName")}
            />
            <InputText
              inputLabel={"Last Name"}
              inputName="lastName"
              // isValid={nameState.credentialsInvalid.lastName.isValid}
              // onUpdateValue={(val) => updateInputValueHandler("enteredLastName", val)}
              // errorMessage={nameState.credentialsInvalid.lastName.errorMessage}
              showClear={true}
              // clearInput={() => clearInputHandler("enteredLastName")}
            />
            <InputText
              inputLabel={"City"}
              inputName="city"
              // isValid={nameState.credentialsInvalid.lastName.isValid}
              // onUpdateValue={(val) => updateInputValueHandler("enteredLastName", val)}
              // errorMessage={nameState.credentialsInvalid.lastName.errorMessage}
              showClear={true}
              // clearInput={() => clearInputHandler("enteredLastName")}
            />
            <InputText
              inputLabel={"County"}
              inputName="country"
              // isValid={nameState.credentialsInvalid.lastName.isValid}
              // onUpdateValue={(val) => updateInputValueHandler("enteredLastName", val)}
              // errorMessage={nameState.credentialsInvalid.lastName.errorMessage}
              showClear={true}
              // clearInput={() => clearInputHandler("enteredLastName")}
            />
          </FormGroup>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileModal;
