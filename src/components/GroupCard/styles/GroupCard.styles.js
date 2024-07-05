import { StyleSheet } from "react-native";

import { theme } from "../../../styles/theme"

export const groupCardStyles = StyleSheet.create({
  container: {
    ...theme.border.radius.lg,
    ...theme.border.width.md,
    minWidth: 320,
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
    backgroundColor: theme.color.surface.base,
    borderColor: theme.color.surface.line,
    flexDirection: 'row'
  },
  groupImageContainer: {
    width: 88
  },
  pressedContainer: {
    ...theme.border.width.lg,
    backgroundColor: theme.color.surface.layer,
    borderColor: theme.color.surface.onBasePrimary,
  },
  focusedContainer: {
    ...theme.border.width.lg,
    borderColor: theme.color.focus.line,
  },
  groupImage: {
    ...theme.border.radius.md,
    width: 140,
    height: 96,
    padding: theme.spacing.sm
  },
  groupTextContentContainer: {
    padding: theme.spacing.sm,
    gap: theme.spacing["2xs"]
  },
  groupName: {
    ...theme.typeography.body.mdBold,
    color: theme.color.surface.onBasePrimary
  },
  groupMembers: {
    ...theme.typeography.body.md,
    color: theme.color.surface.onBaseSecondary
  }
})