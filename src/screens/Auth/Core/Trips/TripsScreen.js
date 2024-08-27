import TabMenu from "../../../../components/TabMenu/TabMenu";
import GroupcationTab from "./tabs/GroupcationTab";
import FavoritesTab from "./tabs/FavoritesTab";

const screens = [
  { name: "My Groupcations", component: GroupcationTab },
  { name: "My Favorites", component: FavoritesTab },
];

const TripsScreen = () => {
  return <TabMenu tabScreens={screens} />;
};

export default TripsScreen;
