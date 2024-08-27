import TabMenu from "../../../../components/TabMenu/TabMenu";
import MessagesTab from "./tabs/MessagesTab";
import NotificationsTab from "./tabs/NotificationTab";

const screens = [
  { name: "Notifications", component: NotificationsTab },
  { name: "Messages", component: MessagesTab },
];

const InboxScreen = () => {
  return <TabMenu tabScreens={screens} />;
};

export default InboxScreen;
