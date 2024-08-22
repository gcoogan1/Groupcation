import { Pressable, Text } from "react-native";

import Icon from "../Icon/Icon";
import { theme } from "../../styles/theme";
import { defaultInlineStyles } from "./styles/InlineButton.styles";

/**
 * This component renders a button based on type and size.
 * @important -> Needs a View wrapping the button to set width/height
 *
 * @param {string} children required -> label of button
 * @param {function} onPress required -> onClick event for button
 * @param {string} buttonType optional -> primary, secondary (defaults to the primary type)
 * @param {object} styles optional -> add styles to button
 * @param {boolean} isDisabled optional -> sets disabled state of button
 * @param {svg} iconRight optional -> displays icon (set color in icon element) to the right of text
 * @param {svg} iconLeft optional -> displays icon (set color in icon element) to the left of text
 * @returns {ReactElement} Renders a button.
 *
 * @example  <InlineButton buttonType={"secondary"} onPress={handleOnPress}>Click me</InlineButton>
 */
const InlineButton = ({
  children,
  onPress,
  buttonType,
  styles,
  isDisabled,
  iconRight,
  iconLeft,
}) => {
  const getTextColor = (buttonType, isDisabled) => {
    if (isDisabled) return { color: theme.color.disabled.onBase };
    if (buttonType === "secondary")
      return { color: theme.color.surface.onBaseSecondary };
    return { color: theme.color.surface.onBasePrimary };
  };

  return (
    <Pressable
      style={({ pressed, focused }) => [
        defaultInlineStyles.button,
        { ...styles },
        pressed && defaultInlineStyles.pressed,
        focused && defaultInlineStyles.focused,
      ]}
      disabled={isDisabled}
      onPress={onPress}
    >
      {!!iconLeft && <Icon>{iconLeft}</Icon>}
      <Text
        style={[defaultInlineStyles.text, getTextColor(buttonType, isDisabled)]}
      >
        {children}
      </Text>
      {!!iconRight && <Icon>{iconRight}</Icon>}
    </Pressable>
  );
};

export default InlineButton;
