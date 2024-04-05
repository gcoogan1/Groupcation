import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const avatarStackStyles = StyleSheet.create({
  container: {
    ...theme.border.radius.full,
    flexDirection: 'row',
    gap: -16
  }
})