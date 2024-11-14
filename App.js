import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from "@expo-google-fonts/rubik";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContextProvider, { AuthContext } from "./src/state/authContext";
import Onboarding from "./src/screens/UnAuth/Onboarding/Onboarding";
import { theme } from "./src/styles/theme";
import Navbar from "./src/components/Navbar/Navbar";
import UserContextProvider from "./src/state/userContext";
import TestSecondScreen from "./src/screens/TestSecondScreen";
import PasswordScreen from "./src/screens/UnAuth/Registation/Password/PasswordScreen";
import EmailScreen from "./src/screens/UnAuth/Registation/Email/EmailScreen";
import NameScreen from "./src/screens/UnAuth/Registation/Name/NameScreen";
import VerificationScreen from "./src/screens/UnAuth/Registation/Verification/VerificationScreen";
import LoginScreen from "./src/screens/UnAuth/Login/Login";
import ResetSuccessScreen from "./src/screens/UnAuth/ResetSuccess/ResetSuccessScreen";
import ExploreScreen from "./src/screens/Auth/Core/Explore/ExploreScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./assets/icons/Explore_Filled.svg";
import Groups from "./assets/icons/Groups_Filled.svg";
import Trips from "./assets/icons/Trips_Filled.svg";
import Inbox from "./assets/icons/Inbox_Filled.svg";
import Profile from "./assets/icons/Profile_Filled.svg";
import BottomTab from "./src/components/BottomTab/BottomTab";
import GroupsScreen from "./src/screens/Auth/Core/Groups/GroupsScreen";
import TripsScreen from "./src/screens/Auth/Core/Trips/TripsScreen";
import TopBar from "./src/components/TopBar/TopBar";
import InboxScreen from "./src/screens/Auth/Core/Inbox/InboxScreen";
import ProfileScreen from "./src/screens/Auth/Core/Profile/ProfileScreen";

import { enableScreens } from 'react-native-screens';
enableScreens();


import { collection, getDocs } from "firebase/firestore";
import { UserContext } from "./src/state/userContext";
import {
  checkEmailExists,
  getCurrentUserId,
} from "./src/util/aws/cognito/idServiceProvider";

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
      background: "#ffffff",
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

  const BottomTabs = createBottomTabNavigator();

  const inActiveColor = theme.color.surface.onBaseSecondary;
  const activeColor = theme.color.primary.base;
  const disabledColor = theme.color.disabled.onBase;

  // const fetchData = async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching documents: ", error);
  //   }
  // };

  // fetchData()

  // const fetchUser = async () => {
  //   try {
  //     const userId = await getCurrentUserId(email); // Replace with the actual user's email
  //     console.log("Logged in user's ID:", userId);
  //     console.log(firstName);
      
  //     firestoreDB.addUser(userId, "gen", "coogan", "gcoogan1@gmail.com")
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // firestoreDB.updateUser('p3iDp1IJ2pgS3KKWnjTP', "genevieve", "coogan", "gcoogan1@gmail.com", "Phila", "US")

  const BottomNavigation = () => {
    return (
      <BottomTabs.Navigator
        sceneContainerStyle={{ backgroundColor: "#fffff" }}
        tabBar={(props) => <BottomTab {...props} />}
      >
        <BottomTabs.Screen
          component={ExploreScreen}
          name="ExploreScreen"
          options={{
            tabBarLabel: "Explore",
            headerShown: false,
            tabBarIcon: <Explore color={inActiveColor} />,
            tabBarIconSelected: <Explore color={activeColor} />,
            tabBarIconDisabled: <Explore color={disabledColor} />,
            isDisabled: false,
          }}
        />
        <BottomTabs.Screen
          component={GroupsScreen}
          name="GroupsScreen"
          options={{
            tabBarLabel: "Groups",
            headerShown: false,
            tabBarIcon: <Groups color={inActiveColor} />,
            tabBarIconSelected: <Groups color={activeColor} />,
            tabBarIconDisabled: <Groups color={disabledColor} />,
            isDisabled: false,
          }}
        />
        <BottomTabs.Screen
          component={TripsScreen}
          name="TripsScreen"
          options={{
            tabBarLabel: "Trips",
            tabBarIcon: <Trips color={inActiveColor} />,
            tabBarIconSelected: <Trips color={activeColor} />,
            tabBarIconDisabled: <Trips color={disabledColor} />,
            isDisabled: false,
            header: () => {
              return (
                <TopBar
                  onButtonPress={() => console.log("click plus")}
                  title={"Trips"}
                />
              );
            },
          }}
        />
        <BottomTabs.Screen
          component={InboxScreen}
          name="InboxScreen"
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: <Inbox color={inActiveColor} />,
            tabBarIconSelected: <Inbox color={activeColor} />,
            tabBarIconDisabled: <Inbox color={disabledColor} />,
            isDisabled: false,
            header: () => {
              return <TopBar title={"Inbox"} />;
            },
          }}
        />
        <BottomTabs.Screen
          component={ProfileScreen}
          name="ProfileScreen"
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: <Profile color={inActiveColor} />,
            tabBarIconSelected: <Profile color={activeColor} />,
            tabBarIconDisabled: <Profile color={disabledColor} />,
            isDisabled: false,
          }}
        />
      </BottomTabs.Navigator>
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
          name="ResetSuccess"
          component={ResetSuccessScreen}
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

  const AuthenticatedStack = () => {
    return (
      <BottomNavigation />
      // <Stack.Navigator>
      //   <Stack.Screen
      //     name="home"
      //     component={ExploreScreen}
      //     options={{
      //       headerShown: false,
      //     }}
      //   />
      // </Stack.Navigator>
    );
  };

  const Navigation = () => {
    const authContext = useContext(AuthContext);

    return (
      <NavigationContainer theme={MyTheme}>
        {!authContext.isAuth && <UnAuthenticatedStack />}
        {!!authContext.isAuth && <AuthenticatedStack />}
      </NavigationContainer>
    );
  };

  const Root = () => {
    const [attemptLogin, setAttemptLogin] = useState(true);
    const authContext = useContext(AuthContext);

    // useEffect(() => {
    //   const fetchToken = async () => {
    //     const storedToken = await AsyncStorage.getItem("token");
    //     if (storedToken) {
    //       authContext.authenticate(storedToken);
    //     }
    //     setAttemptLogin(false);
    //   };
    //   fetchToken();
    // }, []);

    // if (attemptLogin) {
    //   return <Text>Loading</Text>;
    // }
    return <Navigation />;
  };

  return (
    <UserContextProvider>
      <AuthContextProvider>
        <Root />
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
