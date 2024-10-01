import { StyleSheet } from "react-native";
import { theme } from "../../../../styles/theme";

export const profileModalStyles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  inputsContainer: {
    width: '100%'
  }
})