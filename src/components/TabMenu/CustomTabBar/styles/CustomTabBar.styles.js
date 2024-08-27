import { StyleSheet } from "react-native";

import { theme } from "../../../../styles/theme";

export const customTabBarStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    padding: theme.spacing.sm,
    ...theme.border.radius.sm,
    borderBottomColor: theme.color.surface.line,
  },
  tabContainer: {
    flexDirection: "row",
    width: 300,
    justifyContent: "center",
    position: "relative",
  },
  tabButton: {
    flex: 1,
    padding: theme.spacing.sm,
    position: "relative",
  },
  tabLabel: {
    ...theme.typeography.body.mdBold,
    paddingVertical: theme.spacing.sm,
    alignSelf: "center",
    color: theme.color.surface.onBaseSecondary,
  },
  focusedTab: {
    color: theme.color.primary.base,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 73,
    height: 4,
    backgroundColor: theme.color.primary.base,
    borderTopStartRadius: 99,
    borderTopEndRadius: 99,
    alignSelf: "center",
  },
});
