import { StyleSheet } from "react-native";

import { theme } from "../../../styles/theme";

export const pageHeaderStyles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
    alignItems: "center",
  },
  header: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
    textTransform: "capitalize",
  },
  subHeader: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBaseSecondary,
    textAlign: 'center'
  },
});
