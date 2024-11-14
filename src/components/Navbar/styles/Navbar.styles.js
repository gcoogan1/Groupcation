import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const navBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    minWidth: 300,
    backgroundColor: theme.color.surface.base,
    // paddingTop: 56,
    // paddingBottom: theme.spacing.md,
    // paddingHorizontal: theme.spacing.md,
  },
  contentContainer: {
    // paddingTop: 56,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    gap: 4,
  },
  iconContainer: {
    width: 36,
  },
  titleContent: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...theme.typeography.body.mdBold,
    color: theme.color.surface.onBasePrimary,
    textTransform: "capitalize",
  },
  empty: {
    width: 36,
  },
});
