import { ScrollView, Text, View } from "react-native";

import { theme } from "../../../../styles/theme";
import { groupScreenStyles } from "./styles/GroupsScreen.styles";
import Add from "../../../../../assets/icons/Add.svg";
import TopBar from "../../../../components/TopBar/TopBar";
import Box from "../../../../components/Box/Box";
import EmptyState from "../../../../components/EmptyState/EmptyState";

//TODO: Call get friends and my groups, Current default display is empty state

const MOCK_SUGGESTIONS = [{ itemLabel: "Paris" }, { itemLabel: "Hong kong" }];

const GroupsScreen = () => {
  const handleViewAllTrips = () => {
    console.log("show all trips");
  };

  const handleInviteTravelers = () => {
    console.log("invite friends");
  };

  const handleCreateGroup = () => {
    console.log("create a group");
  };
  
  return (
    <ScrollView>
      <TopBar
        onButtonPress={() => console.log("click plus")}
        isSearch
        searchData={MOCK_SUGGESTIONS}
        onSearch={() => console.log("search")}
        sectionTitle={"Most popular destinations"}
        emptyText={"No results found."}
      />
      <View style={groupScreenStyles.friendSection}>
        <Box
          type={"empty"}
          title={"My Friends"}
          pressViewAll={handleViewAllTrips}
        >
          <EmptyState
            text={"You haven’t added any friends yet."}
            onPress={handleInviteTravelers}
            label={"Invite Travelers"}
            iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
          />
        </Box>
      </View>
      <View style={groupScreenStyles.groupsSection}>
        <View style={groupScreenStyles.titleContainer}>
          <Text style={groupScreenStyles.title}>My Groups</Text>
        </View>
        <EmptyState
          text={
            "No groups to show here. Find some to follow and join or create your own!"
          }
          onPress={handleCreateGroup}
          label={"Create a Group"}
          iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
        />
      </View>
    </ScrollView>
  );
};

export default GroupsScreen;
