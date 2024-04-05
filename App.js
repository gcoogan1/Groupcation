import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import Button from "./src/components/Button/Button";

import Icon from "./src/components/Icon/Icon";
import Pictogram from "./src/components/Pictogram/Pictogram";
import Add from "./assets/icons/Add.svg";
import { theme } from "./src/styles/theme";
import Progress from "./src/components/ProgessBar/ProgressBar";
import InlineButton from "./src/components/InlineButton/InlineButton";
import ActionButtons from "./src/components/ActionButtons/ActionButtons";
import EmptyState from "./src/components/EmptyState/EmptyState";
import Avatar from "./src/components/Avatar/Avatar";
import AvatarStack from "./src/components/AvatarStack/AvatarStack";

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const usersInTrip = [
    {
      // image: 'https://i.pinimg.com/564x/d3/05/d6/d305d6b4957713e981c43d381c12b862.jpg',
      initials: 'gc',
      userId: '123'
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/440px-Patrick_Star.svg.png',
      initials: 'hb',
      userId: '456'
    },
    // {
    //   image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/600px-SpongeBob_SquarePants_character.svg.png?20231203073904',
    //   initials: 'pv',
    //   userId: '789'
    // },
    // {
    //   image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/440px-Sandy_Cheeks.svg.png',
    //   initials: 'ja',
    //   userId: '999'
    // },
    // {
    //   image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/440px-Sandy_Cheeks.svg.png',
    //   initials: 'ja',
    //   userId: '900'
    // }
  ]


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
     <AvatarStack users={usersInTrip} size={'md'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 112,
    height: 30
  }
});
