import { StyleSheet } from "react-native";
import { theme } from "../../../../../styles/theme";

export const exploreScreenStyles = StyleSheet.create({
  tripSection: {
    padding: theme.spacing.md,
    gap: theme.spacing.md
  },
  featuredSection: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md
  },
  titleContainer: {
    gap: theme.spacing.sm
  },
  title: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
    textAlign: 'center'
  },
  subTitle: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBaseSecondary,
    textAlign: 'center'
  }
});