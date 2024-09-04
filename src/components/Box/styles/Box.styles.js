import { StyleSheet } from "react-native";

import { theme } from "../../../styles/theme";

export const boxStyles = StyleSheet.create({
  default: {
    ...theme.border.radius.lg,
    gap: theme.spacing.md,
    backgroundColor: theme.color.surface.layer,
  },
  slot: {
    padding: theme.spacing.md,
  },
  groupcation: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  user: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  empty: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  profile: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center'
  },
  note: {
    padding: theme.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
  },
});
