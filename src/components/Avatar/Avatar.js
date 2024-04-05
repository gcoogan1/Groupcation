import { Image, Text, View } from "react-native";

import { avatarStyles } from "./styles/Avatar.styles";
import AvatarConstants from "./constants/Avatar.constants";
import { theme } from "../../styles/theme";

/**
 * This component renders an avatar with either a image or initials. If no props are passed
 * the default will be a md avatar with the initials AZ.
 * @prop {image} avatarImage optional -> users image (link) to be displayed. Must have uri format.
 * @prop {string} size optional -> sm, md, lg, xl, 2x (defaults to md)
 * @prop {string} initials optional -> users initials (limit to two characters)
 * @prop {string} numOfUsers optional -> displays the number of students left
 * @returns {ReactElement} Renders an avatar.
 *
 * @note Image takes precedence over initials. So if an image if given, the image will appear instead of initials.
 * @note NumOfUsers should only be sizes sm or md (defaults to md)
 * @example <Avatar avatarImage={{ uri: 'https:link/to/image.com' }} size="2xl" />
 */
const Avatar = ({ avatarImage, size, initials, numOfUsers }) => {
  const formatedInitials = !!initials
    ? initials.toUpperCase().slice(0, 2)
    : "AZ";

  return (
    <>
      {!!avatarImage?.uri  ? (
        <Image
          source={avatarImage}
          style={[
            size
              ? AvatarConstants.AVATAR_SIZES_STYLE[size]
              : AvatarConstants.AVATAR_SIZES_STYLE["md"],
            avatarStyles.image,
          ]}
        />
      ) : (
        <View
          style={[
            !!size
              ? AvatarConstants.AVATAR_SIZES_STYLE[size]
              : AvatarConstants.AVATAR_SIZES_STYLE["md"],
            {
              backgroundColor: !!numOfUsers
                ? theme.color.disabled.base
                : theme.color.primary.tonal,
            },
            avatarStyles.initialsContainer,
          ]}
        >
          {!!numOfUsers ? (
            <Text
              style={[
                size === "md" && AvatarConstants.AVATAR_TEXT_STYLE["sm"],
                avatarStyles.numText,
              ]}
            >
              +{numOfUsers}
            </Text>
          ) : (
            <Text
              style={[
                !!size
                  ? AvatarConstants.AVATAR_TEXT_STYLE[size]
                  : AvatarConstants.AVATAR_TEXT_STYLE["md"],
                avatarStyles.text,
              ]}
            >
              {formatedInitials}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default Avatar;