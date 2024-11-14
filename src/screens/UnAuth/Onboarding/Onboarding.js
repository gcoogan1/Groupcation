import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { onBoardingStyles } from "./styles/Onboarding.styles";
import PrimaryGroupcation from "../../../../assets/logos/PrimaryGroupcation.svg";
import ActionButtons from "../../../components/ActionButtons/ActionButtons";

const Onboarding = () => {
  const navigation = useNavigation();

  const signupHandler = () => {
    navigation.navigate("Email");
  };

  const loginHandler = () => {
    navigation.navigate("Login");
  };

  const guestHandler = () => {
    navigation.navigate("ExploreScreen");
  };

  const onBoardingButtons = {
    vertical: {
      top: {
        label: "Get Started",
        onPress: signupHandler,
        buttonType: "primary",
      },
      middle: {
        label: "Login",
        onPress: loginHandler,
        buttonType: "secondary",
      },
      bottom: {
        label: "Continue as Guest",
        onPress: guestHandler,
        buttonType: "tertiary",
      },
    },
  };

  return (
    <View style={onBoardingStyles.container}>
      <View style={onBoardingStyles.heroContainer}>
        <View style={onBoardingStyles.imageContainer}>
          <View style={onBoardingStyles.imageContainer}>
            <PrimaryGroupcation />
          </View>
        </View>
        <View style={onBoardingStyles.textContainer}>
          <Text style={onBoardingStyles.title}>Groupcation</Text>
          <Text style={onBoardingStyles.subTitle}>
            Create, plan, share travel itineraries and discover the world with
            other travelers.
          </Text>
        </View>
      </View>
      <ActionButtons layoutStyle="vertical" buttonsGroup={onBoardingButtons} />
    </View>
  );
};

export default Onboarding;
