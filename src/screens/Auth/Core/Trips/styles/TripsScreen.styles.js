import { StyleSheet } from "react-native";

import { theme } from "../../../../../styles/theme"

export const tripsScreenStyles = StyleSheet.create({
  tripsContainer: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md
  },
  titleContainer: {
    gap: theme.spacing.xs
  },
  title: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
  },
})