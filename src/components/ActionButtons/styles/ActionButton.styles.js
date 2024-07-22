import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const verticalStyles = StyleSheet.create({
  layout: {
    borderTopWidth: theme.border.width.md.borderWidth,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.color.surface.base,
    borderTopColor: theme.color.surface.line
  }
})

export const horizontalStyles = StyleSheet.create({
  layout: {
    // width: 300,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: theme.color.surface.base
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg
  },
  buttonWrapper: {
    width: 70,
    height: 52
  }
})