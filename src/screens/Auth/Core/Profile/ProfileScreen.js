import { Text, View } from "react-native";

import Box from "../../../../components/Box/Box";
import Avatar from "../../../../components/Avatar/Avatar";
import { profileScreenStyles } from "./styles/ProfileScreen.styles";
import RowList from "../../../../components/Rows/RowList/RowList";
import RowItemLink from "../../../../components/Rows/RowItemLink/RowItemLink";

const ProfileScreen = () => {
  return (
    <View>
      <View style={profileScreenStyles.container}>
        <Box type="profile">
          <Avatar
            avatarImage={{
              uri: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg",
            }}
            size="2xl"
          />
        <View style={profileScreenStyles.titleContainer}>
          <Text style={profileScreenStyles.title}>User Name</Text>
          <Text style={profileScreenStyles.subTitle}>Lives in USA</Text>
        </View>
        </Box>
      </View>
      <View style={profileScreenStyles.contentContainer}>
        <RowList isRowItemLink>
          <RowItemLink
           type="basic"
           label={"My Trips"}
           subLabel={"Part of 0 Groupcations"}
           showDivider
           linkOnPress={() => console.log("navigate to groupcations")}
          />
          <RowItemLink
           type="basic"
           showDivider
           label={"My Netword"}
           subLabel={"0 Friends"}
           linkOnPress={() => console.log("navigate to friends")}
          />
          <RowItemLink
           type="basic"
           showDivider
           label={"Edit Profile"}
           subLabel={"Name, Location, and Photo"}
           linkOnPress={() => console.log("navigate to edit")}
          />
          <RowItemLink
           type="basic"
           showDivider
           label={"Account Settings"}
           subLabel={"Update Email & Password"}
           linkOnPress={() => console.log("navigate to account")}
          />
          <RowItemLink
           type="basic"
           showDivider
           label={"Logout"}
           linkOnPress={() => console.log("logout user")}
          />
        </RowList>
      </View>
    </View>
  );
};

export default ProfileScreen;
