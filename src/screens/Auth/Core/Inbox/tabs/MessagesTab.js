import { View } from "react-native";

import { inboxScreenStyles } from "../styles/InboxScreen.styles";
import EmptyState from "../../../../../components/EmptyState/EmptyState";

//TODO: call get messages

const MessagesTab = () => {
  return (
    <View style={inboxScreenStyles.inboxContainer}>
      <EmptyState text={"You have no messages."} />
    </View>
  );
};

export default MessagesTab;
