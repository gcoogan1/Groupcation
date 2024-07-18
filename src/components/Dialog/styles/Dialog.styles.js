import { StyleSheet } from "react-native";

import { theme } from "../../../styles/theme";

export const dialogStyles = StyleSheet.create({
  container: {
    ...theme.border.radius.lg,
    backgroundColor: theme.color.surface.base,
    elevation: 2,
    width: '80%',
    shadowColor: theme.color.shadow.dark,
    shadowOpacity: 0.10,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  contents: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.md
  },
  textContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  titleContainer: {
    gap: theme.spacing.xs
  },
  title: {
    ...theme.typeography.title.md,
    color: theme.color.surface.onBasePrimary,
    textTransform: 'capitalize'
  },
  subTitle: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBaseSecondary
  }
})