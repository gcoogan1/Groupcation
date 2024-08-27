import { StyleSheet } from "react-native";

import { theme } from "../../../../../styles/theme";

export const inboxScreenStyles = StyleSheet.create({
  inboxContainer: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
});
