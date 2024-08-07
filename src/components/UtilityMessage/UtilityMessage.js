import { View, Text } from "react-native";

import Pictogram from "../Pictogram/Pictogram";
import Button from "../Button/Button";
import Error from "../../../assets/pictograms/Error.svg";
import Success from "../../../assets/pictograms/Success.svg";
import { utilityMessageStyles } from "./styles/UtilityMessage.styles";

/**
 * This component renders either an error or success message.
 * @prop {boolean} isError optional -> if true an error message will show (default to success)
 * @prop {string} successTitle optional -> title of success message
 * @prop {string} successSubtitle optional -> subtitle of success message
 * @prop {string} successButtonText optional -> text of success button
 * @prop {function} successOnPress optional -> event of success button
 * @returns {ReactElement} Renders a utility message.
 *
 * @example
 * <UtilityMessage  />
 */
const UtilityMessage = ({ isError, successTitle, successSubtitle, successButtonText, successOnPress }) => {

  const handleSuccess = () => {
    if (successOnPress) {
      successOnPress()
    }
  };

  const handleError = () => {
    console.log("error");
  };

  return (
    <View style={utilityMessageStyles.container}>
      <View style={utilityMessageStyles.messageContainer}>
        <Pictogram>{!!isError ? <Error /> : <Success />}</Pictogram>
        <View style={utilityMessageStyles.textContainer}>
          <Text style={utilityMessageStyles.title}>{!isError ? successTitle : "Uh-oh!"}</Text>
          <Text style={utilityMessageStyles.subTitle}>
            {!isError
              ? "Something went wrong. Please try again."
              : successSubtitle}
          </Text>
        </View>
      </View>
      {!!isError ? (
        <Button onPress={handleError} buttonType={"tonal"}>
          Retry
        </Button>
      ) : (
        <Button onPress={handleSuccess} buttonType={"tonal"}>
          {successButtonText}
        </Button>
      )}
    </View>
  );
};

export default UtilityMessage;
