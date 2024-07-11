import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import Onboarding from "./src/screens/UnAuth/Onboarding/Onboarding";
import TestScreen from "./src/screens/TestScreen";
import { theme } from "./src/styles/theme";
import Icon from "./src/components/Icon/Icon";
import Button from "./src/components/Button/Button";
import Close from "./assets/icons/Close.svg";
import Back from "./assets/icons/Back.svg";
import Navbar from "./src/components/Navbar/Navbar";

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();
  // const TopTabs = createMaterialTopTabNavigator();

  // const TopNavigation = () => {
  //   return (
  //     <TopTabs.Navigator
  //       sceneContainerStyle={{ backgroundColor: "#fffff" }}
  //       //  tabBar={(props) => <Navbar type={'userInput'} pageTitle={'Input Title'} {...props} />}
  //     >
  //       {/* <TopTabs.Screen component={TestScreen} name="UserInputScreen" /> */}
  //       <TopTabs.Screen component={TestSecondScreen} name="TestScreen" />
  //     </TopTabs.Navigator>
  //   );
  // };

  // const BottomTabs = createBottomTabNavigator();

  // const inActiveColor = theme.color.surface.onBaseSecondary;
  // const activeColor = theme.color.primary.base;
  // const disabledColor = theme.color.disabled.onBase;

  // const BottomNavigation = () => {
  //   return (
  //     <BottomTabs.Navigator
  //       sceneContainerStyle={{ backgroundColor: "#fffff" }}
  //       tabBar={(props) => <BottomTab {...props} />}
  //     >
  //       <BottomTabs.Screen
  //         component={TestSecondScreen}
  //         name="TestSecondScreen"
  //         options={{
  //           tabBarLabel: "Explore",
  //           tabBarIcon: <Explore color={inActiveColor} />,
  //           tabBarIconSelected: <Explore color={activeColor} />,
  //           tabBarIconDisabled: <Explore color={disabledColor} />,
  //           isDisabled: false
  //         }}
  //       />
  //       <BottomTabs.Screen
  //         component={TestScreen}
  //         name="TestScreen"
  //         options={{
  //           tabBarLabel: "Groups",
  //           tabBarIcon: <Groups color={inActiveColor} />,
  //           tabBarIconSelected: <Groups color={activeColor} />,
  //           tabBarIconDisabled: <Groups color={disabledColor} />,
  //           isDisabled: false
  //         }}
  //       />
  //     </BottomTabs.Navigator>
  //   );
  // };

  // onPress={() => navigation.navigate("Welcome")}

  const backButton = () => {
    return (
      <Button
        buttonType={"tertiary"}
        buttonSize={"sm"}
        onPress={() => navigation.goBack()}
        iconLeft={<Back color={theme.color.surface.onBasePrimary} />}
        styles={{ gap: 0 }}
      />
    );
  };

  const UnAuthenticatedStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Email"
          component={TestScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => {
              return (
                <Navbar
                type={"close"} 
                onClosePress={() => navigation.goBack()}
               />
              );
            },
          })}
        />
        <Stack.Screen
          name="Name"
          component={TestScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => {
              return (
                <Navbar
                  type={"back"}
                  onBackPress={() => navigation.goBack()}
                />
              );
            },
          })}
        />
        <Stack.Screen
          name="Password"
          component={TestScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => {
              return (
                <Navbar
                  type={"back"}
                  onBackPress={() => navigation.goBack()}
                />
              );
            },
          })}
        />
        <Stack.Screen
          name="Verification"
          component={TestScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => {
              return (
                <Navbar
                  type={"back"}
                  onBackPress={() => navigation.goBack()}
                />
              );
            },
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <UnAuthenticatedStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 0,

    // backgroundColor: "#fffff",
    // justifyContent: "center",
    alignItems: "center",
    // // flexDirection: "row",
    // gap: 20,
  },
  btn: {
    width: 112,
    height: 30,
  },
  footerContainer: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
  suggestionItemText: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBasePrimary,
  },
});
