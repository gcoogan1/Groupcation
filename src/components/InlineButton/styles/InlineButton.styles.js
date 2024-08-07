import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const defaultInlineStyles = StyleSheet.create({
  button: {
    ...theme.border.radius.full,
    ...theme.border.width.lg,
    paddingHorizontal: theme.spacing.sm,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs
  },
  focused: {
    borderColor: theme.color.focus.line,
  },
  pressed: {
    borderColor: theme.color.surface.onBasePrimary,
    backgroundColor: theme.color.surface.layer
  },
  text: {
    ...theme.typeography.body.mdBold,
    fontSize: 14
  }
});