import { StyleSheet } from "react-native";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthContextProvider, { AuthContext } from "./src/state/authContext";
import Onboarding from "./src/screens/UnAuth/Onboarding/Onboarding";
import { theme } from "./src/styles/theme";
import Navbar from "./src/components/Navbar/Navbar";
import UserContextProvider from "./src/state/userContext";
import PasswordScreen from "./src/screens/UnAuth/Registation/Password/PasswordScreen";
import EmailScreen from "./src/screens/UnAuth/Registation/Email/EmailScreen";
import NameScreen from "./src/screens/UnAuth/Registation/Name/NameScreen";
import VerificationScreen from "./src/screens/UnAuth/Registation/Verification/VerificationScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff'
    },
  };

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
          component={EmailScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerShadowVisible: false,
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
          component={NameScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Navbar type={"back"} onBackPress={() => navigation.goBack()} />
              );
            },
          })}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Navbar type={"back"} onBackPress={() => navigation.goBack()} />
              );
            },
          })}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => {
              return (
                <Navbar type={"back"} onBackPress={() => navigation.goBack()} />
              );
            },
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <NavigationContainer theme={MyTheme}>
          <UnAuthenticatedStack />
        </NavigationContainer>
      </AuthContextProvider>
    </UserContextProvider>
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
