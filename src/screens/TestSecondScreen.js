import { StyleSheet, Text, View } from "react-native";

import FormGroup from "../components/FormGroup/FormGroup";
import InputText from "../components/Inputs/InputText/InputText";
import TopBar from "../components/TopBar/TopBar";
import Dialog from "../components/Dialog/Dialog";
import GroupCard from "../components/GroupCard/GroupCard";

const TestSecondScreen = () => {
  return (
    <View style={styles.container}>
      <GroupCard
        groupImg={"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        groupName={"Fance Trip"}
        groupMembers={9}
      />
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
