import { Pressable, ImageBackground, Text, View } from 'react-native'

import Tag from "../Tag/Tag"
import { groupCardStyles } from './styles/GroupCard.styles'

/**
 * This component renders a group card with group information.
 * @prop {string} groupImage required -> url of group image
 * @prop {string} groupName required -> name of group
 * @prop {nnumber} groupMembers required -> number of members in group
 * @returns {ReactElement} Renders a Group Card.
 *
 * @example
 *  <GroupCard
      groupImg={"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      groupName={"Fance Trip"}
      groupMembers={9}
    />
 */
const GroupCard = ({ groupImg, groupName, groupMembers }) => {
  return (
    <Pressable  style={({ pressed, focused }) => [
      groupCardStyles.container,
      pressed && groupCardStyles.pressedContainer,
      focused && groupCardStyles.focusedContainer,
    ]}>
      <ImageBackground style={groupCardStyles.groupImage} source={{ uri: groupImg }}> 
        <View style={groupCardStyles.groupImageContainer}>
          <Tag tagType={"member"} small />
        </View>
      </ImageBackground>
      <View style={groupCardStyles.groupTextContentContainer}>
        <Text style={groupCardStyles.groupName}>{groupName}</Text>
        <Text style={groupCardStyles.groupMembers}>{groupMembers} Members</Text>
      </View>
    </Pressable>
  )
}

export default GroupCard