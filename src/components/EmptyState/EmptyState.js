import { Text, View } from "react-native";

import Button from "../Button/Button";
import { emptyStateStyles } from "./styles/EmptyState.styles";

/**
 * This component renders a container with text above a button.
 * @prop {string} text required -> text to be displayed above the button
 * @prop {function} onPress required -> onPress event for button
 * @prop {string} label required -> label of button
 * @prop {svg} iconLeft optional -> displays icon (set color in icon element) to the right of text
 * @returns {ReactElement} Renders a container with text and a button.
 *
 * @example <EmptyState text={'Empty state text'} onPress={() => console.log("click")} label={'label'} />
 */
const EmptyState = ({ text, onPress, label, iconLeft }) => {
  return (
    <View style={emptyStateStyles.container}>
      <Text style={emptyStateStyles.text}>{text}</Text>
      <Button buttonType={"secondary"} onPress={onPress} iconLeft={iconLeft}>
        {label}
      </Button>
    </View>
  );
};

export default EmptyState;
