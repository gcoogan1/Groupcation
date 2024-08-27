import { View } from "react-native";

import { inboxScreenStyles } from "../styles/InboxScreen.styles";
import EmptyState from "../../../../../components/EmptyState/EmptyState";

//TODO: call get notifications

const NotificationsTab = () => {
  return (
    <View style={inboxScreenStyles.inboxContainer}>
      <EmptyState text={"You have no new notifications."} />
    </View>
  );
};

export default NotificationsTab;
