import { StyleSheet, Text, View } from "react-native";

import FormGroup from "../components/FormGroup/FormGroup";
import InputText from "../components/Inputs/InputText/InputText"
import TopBar from "../components/TopBar/TopBar";
import Dialog from "../components/Dialog/Dialog";
import UtilityMessage from "../components/UtilityMessage/UtilityMessage";
import Box from "../components/Box/Box";
import EmptyState from "../components/EmptyState/EmptyState";

const TestSecondScreen = () => {
  const actionButtons = {
    vertical: {
      top: {
        label: "Label Top",
        onPress: () => console.log("TOP"),
      },
      bottom: {
        label: "Label Bottom",
        onPress: () => console.log("BOTTOM"),
      },
    },
  };

  return (
    <View style={styles.container}>

      <Box type={"empty"} title={"Title"} pressViewAll={() => console.log("press view all")}>
        <EmptyState text={'Empty state text'} onPress={() => console.log("click")} label={'label'} />
      </Box>
    </View>
  );
};

export default TestSecondScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 400,
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#fffff",
  },
  text: {
    color: "red",
  },
});
