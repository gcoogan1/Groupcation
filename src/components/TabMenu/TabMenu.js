import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { theme } from "../../styles/theme";
import CustomTabBar from "./CustomTabBar/CustomTabBar";

/**
 * This component renders a tab menu with screen options to navigate to.
 * @prop {array} tabScreens required -> array of objects containing screens that can be navigated to in the tab
 * ex. const screens = [
 * { name: 'test', component: TestScreen },
 * { name: 'test Two', component: TestSecondScreen }
 * ]
 * @returns {ReactElement} Renders a tab menu.
 *
 * @important Component MUST be wrapped inside NavigationContainer to work
 * @example
 * <NavigationContainer>
    <TabMenu tabScreens={screens} />
   </NavigationContainer>
 */
const TabMenu = ({ tabScreens }) => {
  const Tab = createMaterialTopTabNavigator();

  if (!tabScreens || tabScreens.length === 0) {
    return;
  }

  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: theme.color.primary.base,
          tabBarInactiveTintColor: theme.color.surface.onBaseSecondary,
          tabBarLabelStyle: { ...theme.typeography.body.mdBold },
          tabBarStyle: {
            padding: theme.spacing.sm,
            ...theme.border.radius.sm,
            borderBottomWidth: 1,
            borderBottomColor: theme.color.surface.line,
          },
          tabBarPressColor: "transparent",
        }}
        // screenOptions={{
        //   tabBarActiveTintColor: theme.color.primary.base,
        //   tabBarInactiveTintColor: theme.color.surface.onBaseSecondary,
        //   tabBarLabelStyle: { ...theme.typeography.body.mdBold },
        //   tabBarStyle: {
        //     padding: theme.spacing.sm,
        //     ...theme.border.radius.sm,
        //     borderBottomWidth: 1,
        //     borderBottomColor: theme.color.surface.line,
        //   },
        //   tabBarPressColor: "transparent",
        //   tabBarIndicatorStyle: {
        //     backgroundColor: theme.color.primary.base,
        //     height: 4,
        //     borderTopStartRadius: 99,
        //     borderTopEndRadius: 99,
        //     width: 73,
        //   },
        //   tabBarIndicatorContainerStyle: {
        //     marginHorizontal: theme.spacing.sm, 
        //     justifyContent: 'center',
        //   },
        //   // tabBarItemStyle: {
        //   //   width: 73
        //   // },
        // }}
      >
        {tabScreens.map((screen) => {
          return (
            <Tab.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
};

export default TabMenu;