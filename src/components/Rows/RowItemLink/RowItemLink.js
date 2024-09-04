import { Pressable, Text, View } from "react-native";

import Icon from "../../Icon/Icon";
import ChevronRight from "../../../../assets/icons/Chevron_Right.svg";
import { theme } from "../../../styles/theme";
import { rowItemLinkStyles } from "./styles/RowItemLink.styles";
import { capitilaizeFirstLetter } from "../../../util/helperFunctions/helperFunctions";
import RowItemLinkConstants from "./constants/RowItemLink.constants";

/**
 * This component renders a row item that inludes an icon and text.
 * @prop {string} type required -> type of row item link (basic, activity, user, notification, message, avatars)
 * @prop {string} label required -> text for label
 * @prop {function} linkOnPress required -> event to be fired when item link is pressed
 * @prop {string} subLabel optional -> text for subLabel
 * @prop {svg} icon optional -> icon to be displayed
 * @prop {component} user optional -> avatar to be displayed in place of icon
 * @prop {component} avatars optional -> avatar stack to be displayed
 * @prop {boolean} showChevron optional -> displays chevron (set to false if using avatars or message or if cost is available (type user))
 * @prop {boolean} showDivider optional -> displays bottom divider
 * @prop {boolean} isDisabled optional -> sets disabled state if row item link
 * @prop {number} count optional -> number of messages left unread (type message)
 * @prop {number} cost optional -> cost of an activity (type user)
 * @prop {string} time optional -> time the message was sent(type message) -> ex. 12:06pm, yesterday, 10/09/2024
 * @returns {ReactElement} Renders a row item.
 *
 * @note Be sure to update the icon color to match the button type
 * @example
 * <RowItemLink
    type={'avatars'}
    linkOnPress={() => console.log("navigate")}
    label={"label"}
    subLabel={"sub-label"}
    avatars={<AvatarStack users={users}  />}
    />
 */
const RowItemLink = ({
  type,
  label,
  linkOnPress,
  subLabel,
  icon,
  user,
  avatars,
  showChevron,
  showDivider,
  isDisabled,
  count,
  cost,
  time,
}) => {
  const typeTextStyles = RowItemLinkConstants.ROW_ITEM_LINK_TEXT_STYLE[type];

  return (
    <>
      <View style={rowItemLinkStyles.container}>
        <Pressable
          style={({ pressed, focused }) => [
            rowItemLinkStyles.contentContainer,
            !!avatars && { padding: theme.spacing.sm },
            pressed && rowItemLinkStyles.pressedContentContainer,
            focused && rowItemLinkStyles.focusedContentContainer,
          ]}
          onPress={linkOnPress}
        >
          <View style={rowItemLinkStyles.iconContainer}>
            {!!icon && <Icon>{icon}</Icon>}
            {!!user && <>{user}</>}
          </View>
          <View
            style={[
              rowItemLinkStyles.labelContainer,
              !!user && rowItemLinkStyles.user,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                rowItemLinkStyles.label,
                typeTextStyles?.label,
                isDisabled && rowItemLinkStyles.textDisabled,
              ]}
            >
              {capitilaizeFirstLetter(label)}
            </Text>
            {subLabel && type !== "user" && (
              <Text
                numberOfLines={2}
                style={[
                  rowItemLinkStyles.subLabel,
                  typeTextStyles?.subLabel,
                  isDisabled && rowItemLinkStyles.textDisabled,
                ]}
              >
                {capitilaizeFirstLetter(subLabel)}
              </Text>
            )}
          </View>
          <View
            style={[
              rowItemLinkStyles.extrasContainer,
              isDisabled && type === "avatars" && { opacity: 0.4 },
            ]}
          >
            {showChevron && (
              <Icon>
                <ChevronRight
                  color={
                    isDisabled
                      ? theme.color.disabled.onBase
                      : theme.color.surface.onBaseSecondary
                  }
                />
              </Icon>
            )}
            {!!avatars && type === "avatars" && <>{avatars}</>}
            {type === "message" && (
              <View style={rowItemLinkStyles.messageContainer}>
                <Text
                  style={[
                    rowItemLinkStyles.timeText,
                    isDisabled && rowItemLinkStyles.disabledExtraText,
                  ]}
                >
                  {time}
                </Text>
                <View
                  style={[
                    rowItemLinkStyles.countContainer,
                    isDisabled && rowItemLinkStyles.disabledCountConatiner,
                  ]}
                >
                  <Text
                    style={[
                      rowItemLinkStyles.countText,
                      isDisabled && rowItemLinkStyles.disabledExtraText,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </View>
            )}
            {!!cost && type === "user" && (
              <View style={rowItemLinkStyles.costContainer}>
                <Text style={rowItemLinkStyles.costText}>{cost}</Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
      {showDivider && <View style={rowItemLinkStyles.divider}></View>}
    </>
  );
};

export default RowItemLink;
