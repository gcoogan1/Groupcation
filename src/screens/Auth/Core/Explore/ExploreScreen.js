import { ScrollView, View } from "react-native";

import { theme } from "../../../../styles/theme";
import Add from "../../../../../assets/icons/Add.svg";
import TopBar from "../../../../components/TopBar/TopBar";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import Box from "../../../../components/Box/Box";
import { exploreScreenStyles } from "./styles/ExploreScreen.styles";
import { Text } from "react-native";

//TODO: Call get user groupcations and featured groupcations, Current default display is empty state

const MOCK_SUGGESTIONS = [{ itemLabel: "Paris" }, { itemLabel: "Hong kong" }];

const ExploreScreen = () => {
  const handleViewAllTrips = () => {
    console.log("show all trips");
  };

  const handleCreateGroupcation = () => {
    console.log("go to grouocation screen");
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
      <View style={exploreScreenStyles.tripSection}>
        <Box
          type={"empty"}
          title={"My Trips"}
          pressViewAll={handleViewAllTrips}
        >
          <EmptyState
            text={"You haven't created any trips yet"}
            onPress={handleCreateGroupcation}
            label={"Create a groupcation"}
            iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
          />
        </Box>
      </View>
      <View style={exploreScreenStyles.featuredSection}>
        <View style={exploreScreenStyles.titleContainer}>
          <Text style={exploreScreenStyles.title}>Featured</Text>
          <Text style={exploreScreenStyles.subTitle}>
            See the latest recommended Groupcations.
          </Text>
        </View>
        <EmptyState
          text={
            "No featured Groupcations available to view. Create one of your own!"
          }
          onPress={handleCreateGroupcation}
          label={"Create a groupcation"}
          iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
        />
      </View>
    </ScrollView>
  );
};

export default ExploreScreen;
