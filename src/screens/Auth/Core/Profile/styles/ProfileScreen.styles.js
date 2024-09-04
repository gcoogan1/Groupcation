import { StyleSheet } from "react-native";

import { theme } from "../../../../../styles/theme";

export const profileScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md
  },
  titleContainer: {
    gap: theme.spacing["2xs"]
  },
  title: {
    ...theme.typeography.title.md,
    textAlign: 'center',
    color: theme.color.surface.onBasePrimary
  },
  subTitle: {
    ...theme.typeography.body.md,
    textAlign: 'center',
    color: theme.color.surface.onBaseSecondary
  },
  contentContainer: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md
  }
})