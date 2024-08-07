import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UtilityMessage from "../../../components/UtilityMessage/UtilityMessage";

const ResetSuccessScreen = () => {
  const navigation = useNavigation();

  const handleSuccess = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <UtilityMessage
        successTitle="Password Updated"
        successSubtitle="You can now log in to Groupcation with your new password."
        successButtonText="Go to Log In"
        successOnPress={handleSuccess}
      />
    </View>
  );
};

export default ResetSuccessScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#fffff",
  }
});
