import { StyleSheet } from "react-native";

import { theme } from "../../../../../styles/theme";

export const groupScreenStyles = StyleSheet.create({
  friendSection: {
    padding: theme.spacing.md,
    gap: theme.spacing.md
  },
  groupsSection: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md
  },
  titleContainer: {
    gap: theme.spacing.xs
  },
  title: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
    textAlign: 'center'
  },
})