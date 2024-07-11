import { StyleSheet } from "react-native";

import { theme } from "../../../../styles/theme"

export const onBoardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.surface.base,
    alignContent: "center",
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
    gap: theme.spacing.md
  },
  imageContainer: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  textContainer: {
    gap: theme.spacing.xs,
    alignItems: "center",
  },
  title: {
    ...theme.typeography.title.lg,
    color: theme.color.primary.base
  },
  subTitle: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBasePrimary,
    textAlign: 'center'
  }
})