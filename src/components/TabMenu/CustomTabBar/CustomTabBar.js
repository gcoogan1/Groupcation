import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { customTabBarStyles } from "./styles/CustomTabBar.styles";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[customTabBarStyles.container, { paddingBottom: insets.bottom }]}
    >
      <View style={customTabBarStyles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={customTabBarStyles.tabButton}
            >
              <Text
                style={[
                  customTabBarStyles.tabLabel,
                  isFocused && customTabBarStyles.focusedTab,
                ]}
              >
                {label}
              </Text>
              {isFocused && <View style={[customTabBarStyles.indicator]} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
