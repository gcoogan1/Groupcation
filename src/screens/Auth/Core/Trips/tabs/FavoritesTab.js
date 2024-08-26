import { View } from 'react-native'

import { tripsScreenStyles } from '../styles/TripsScreen.styles'
import { theme } from "../../../../../styles/theme";
import Add from "../../../../../../assets/icons/Add.svg";
import EmptyState from "../../../../../components/EmptyState/EmptyState";

//TODO: call get favorites, add logic to diplay groupcations title (year?) when not empty

const FavoritesTab = () => {
  const handleCreateGroupcation = () => {
    console.log("go to grouocation screen");
  };

  return (
    <View style={tripsScreenStyles.tripsContainer}>
    <View style={tripsScreenStyles.titleContainer}></View>
    <EmptyState
      text={"You haven't created any trips yet"}
      onPress={handleCreateGroupcation}
      label={"Create a groupcation"}
      iconLeft={<Add color={theme.color.surface.onBasePrimary} />}
    />
  </View>
  )
}

export default FavoritesTab