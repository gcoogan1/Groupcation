import { Text, View } from "react-native";

import { theme } from "../../styles/theme";
import Back from "../../../assets/icons/Back.svg";
import Close from "../../../assets/icons/Close.svg";
import Share from " ../../../assets/icons/Share.svg";
import Settings from "../../../assets/icons/Settings.svg";
import Button from "../Button/Button";
import { navBarStyles } from "./styles/Navbar.styles";

/**
 * This component renders a navbar based on its props.
 * @prop {string} type required -> type of navbar to be displayed ('back', 'close', 'groupcation', 'userInput')
 * @prop {string} pageTitle optional -> text to be displayed (will NOT appear on type 'groupcation')
 * @prop {function} onClosePress optional -> event to be fired, should close screen
 * @prop {function} onBackPress optional -> event to be fired, should go back a screen
 * @prop {function} onSharePress optional -> event to be fired, should navigate to share screen
 * @prop {function} onSettingsPress optional -> event to be fired, should navigate to settings screen
 * @returns {ReactNode} Renders a top navbar.
 *
 * @example
 * <Navbar
 *  type={"groupcation"}
 *  pageTitle={"Overview"}
 *  onSharePress={() => console.log("share")}
 *  onSettingsPress={() => console.log('settings')}
 * />
 */
const Navbar = ({
  type,
  pageTitle,
  onClosePress,
  onBackPress,
  onSharePress,
  onSettingsPress,
}) => {
  const NAVBAR_COLOR = theme.color.surface.onBasePrimary;

  const iconButton = (icon, iconOnPress) => {
    return (
      <View style={navBarStyles.iconContainer}>
        <Button
          styles={{ gap: 0 }}
          buttonSize="sm"
          buttonType={type === "groupcation" ? "default" : "tertiary"}
          iconRight={icon}
          onPress={iconOnPress}
        />
      </View>
    );
  };

  return (
    <View style={navBarStyles.container}>
      <View style={navBarStyles.contentContainer}>
        {type === "back" ? (
          <>{iconButton(<Back color={NAVBAR_COLOR} />, onBackPress)}</>
        ) : (
          <>{iconButton(<Close color={NAVBAR_COLOR} />, onClosePress)}</>
        )}
        <View style={navBarStyles.titleContent}>
          {type !== "groupcation" && (
            <Text numberOfLines={1} style={navBarStyles.title}>
              {pageTitle}
            </Text>
          )}
        </View>
        {type === "groupcation" ? (
          <>
            {onSharePress && type === "groupcation" && (
              <>{iconButton(<Share color={NAVBAR_COLOR} />, onSharePress)}</>
            )}
            {onSettingsPress && type === "groupcation" && (
              <>
                {iconButton(<Settings color={NAVBAR_COLOR} />, onSettingsPress)}
              </>
            )}
          </>
        ) : (
          <View style={navBarStyles.empty}></View>
        )}
      </View>
    </View>
  );
};

export default Navbar;
