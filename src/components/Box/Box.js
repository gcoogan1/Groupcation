import { Text, View } from "react-native";

import { theme } from "../../styles/theme";
import { boxStyles } from "./styles/Box.styles";
import ChevronRight from "../../../assets/icons/Chevron_Right.svg";
import InlineButton from "../InlineButton/InlineButton";

/**
 * This component renders box (wrapper) that has specific styling for the type defined.
 * @prop {string} type required -> string that defines the type of box to match the style of the chilren passed. MUST BE ON OF THE FOLLOWING: (slot, groupcation, user, empty, profile and note)
 * @prop {string} title optional (req if type is groupcation, user or empty) -> title to display in box.
 * @prop {function} pressViewAll optional (req if type is groupcation, user or empty) -> event to be fired
 * when the view all button is pressed
 * @returns {ReactElement} Renders a styled box with children.
 *
 * @example    
 *  <Box type={"empty"} title={"Title"} pressViewAll={() => console.log("press view all")}>
      <EmptyState text={'Empty state text'} onPress={() => console.log("click")} label={'label'} />
    </Box>
 */
const Box = ({ type, title, pressViewAll, children }) => {
  const displayTitleTypes = ["groucation", "user", "empty"];
  return (
    <View style={[boxStyles.default, boxStyles[type]]}>
      {displayTitleTypes.includes(type) && (
        <View style={boxStyles.titleContainer}>
          <Text style={boxStyles.title}>{title}</Text>
          <InlineButton
            buttonType={"secondary"}
            onPress={pressViewAll}
            iconRight={
              <ChevronRight color={theme.color.surface.onBaseSecondary} />
            }
          >
            View All
          </InlineButton>
        </View>
      )}
      {children}
    </View>
  );
};

export default Box;
