import { StyleSheet } from "react-native";

import { theme } from "../../../styles/theme";

export const emptyStateStyles = StyleSheet.create({
  container:{
    ...theme.border.radius.lg,
    ...theme.border.width.lg,
    minWidth: 300,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    alignItems: 'center',
    borderColor: theme.color.surface.line
  },
  text: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBaseSecondary,
    textAlign: 'center'
  }
})