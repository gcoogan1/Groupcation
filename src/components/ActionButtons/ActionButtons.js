import { View } from "react-native";

import Button from "../Button/Button";
import { retrieveButtonPropertiesFromGroup } from "./util/util";
import Progress from "../ProgessBar/ProgressBar";
import Loader from "../Loader/Loader";
import { horizontalStyles, verticalStyles } from "./styles/ActionButton.styles";

/**
 * This component renders a group of action buttons based on layout given.
 * @param {string} layoutStyle required -> vertical or horizontal
 * @param {object} buttonsGroup required -> object must either have a vertical or horizontal nested object with the either of the following properties:
  * @note properties are OPTIONAL (Ex. top and middle can be passed into vertical object without a bottom)
  * @example vertical:  
  * const actionButtons = {
      vertical: {
        top: {
          label: 'Label Top',
          onPress: () => console.log("TOP"),
          buttonType: 'default',
        },
        middle: {
          label: 'Label Middle',
          onPress: () => console.log("MIDDLE"),
          buttonType: 'default',
        },
        bottom: {
          label: 'Label Bottom',
          onPress: () => console.log("BOTTOM"),
          buttonType: 'default',
        },
      }
    }
   * @example horizontal: 
    const actionButtons = {
      horizontal: {
        left: {
          label: 'Label Left',
          onPress: () => console.log("LEFT"),
          buttonType: 'default',
        },
        right: {
          label: 'Label Right',
          onPress: () => console.log("RIGHT"),
          buttonType: 'default',
        }
      }
  }
 * @param {number} progressStep required (if horizontal) -> Must contain a step from 0-1
 * @returns {ReactElement} Renders a group of action buttons.
 * 
 * @example   
 * <ActionButtons
    layoutStyle="horizontal"
    buttonsGroup={actionButtons}
  />
 */
const ActionButtons = ({ layoutStyle, buttonsGroup, progressStep }) => {
  const buttonProperties = retrieveButtonPropertiesFromGroup(
    layoutStyle,
    buttonsGroup
  );

  if (buttonProperties.length === "0") {
    return <Loader />;
  }

  return (
    <>
      {layoutStyle === "vertical" ? (
        <View style={verticalStyles.layout}>
          {Object.keys(buttonProperties).map(
            (key) =>
              buttonProperties[key] && (
                <Button
                  key={key}
                  styles={{ width: "100%" }}
                  buttonType={buttonProperties[key].buttonType}
                  onPress={buttonProperties[key].onPress}
                  isLoading={buttonProperties[key].isLoading}
                >
                  {buttonProperties[key].label}
                </Button>
              )
          )}
        </View>
      ) : (
        <View style={horizontalStyles.layout}>
          <Progress step={progressStep} />
          <View style={horizontalStyles.buttonsContainer}>
            {Object.keys(buttonProperties).map(
              (key) =>
                buttonProperties[key] && (
                  <Button
                    key={key}
                    buttonType={buttonProperties[key].buttonType}
                    onPress={buttonProperties[key].onPress}
                    isLoading={buttonProperties[key].isLoading}
                  >
                    {buttonProperties[key].label}
                  </Button>
                )
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default ActionButtons;
