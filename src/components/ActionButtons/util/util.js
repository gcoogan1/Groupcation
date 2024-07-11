const REQUIRED_VERTICAL_KEYS = ["top", "middle", "bottom"];
const REQUIRED_HORIZONTAL_KEYS = ["left", "right"];
const REQUIRED_BUTTON_PROPERTIES = ["label", "onPress", "buttonType"];

const verifyButtonGroup = (btnsGroup, requiredKeys) => {
  const groupKeys = Object.keys(btnsGroup);
  const keysExist = requiredKeys.some((key) => groupKeys.includes(key));
  const buttonsVerified =
    keysExist &&
    Object.values(btnsGroup).every((button) => verifyButtonProperties(button));
  return buttonsVerified;
};

const verifyButtonProperties = (button) => {
  return REQUIRED_BUTTON_PROPERTIES.every(
    (requiredProperty) => requiredProperty in button
  );
};

export const retrieveButtonPropertiesFromGroup = (groupType, buttonGroup) => {
  if (groupType === "vertical" && !!buttonGroup.vertical) {
    const verticalButtonsConfirmed = verifyButtonGroup(
      buttonGroup.vertical,
      REQUIRED_VERTICAL_KEYS
    );
    return !!verticalButtonsConfirmed && buttonGroup.vertical;
  }
  if (groupType === "horizontal" && !!buttonGroup.horizontal) {
    const horizontalButtonsConfirmed = verifyButtonGroup(
      buttonGroup.horizontal,
      REQUIRED_HORIZONTAL_KEYS
    );
    return !!horizontalButtonsConfirmed && buttonGroup.horizontal;
  }
  return null;
};
