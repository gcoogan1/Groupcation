import { Pressable, Text } from 'react-native'

import Icon from '../../Icon/Icon'
import GoogleIcon from "../../../../assets/logos/Google.svg"
import { socialLoginButtonStyles } from './SocialLoginButton.styles'
import { useGoogleAuth } from '../../../util/firebase/firebaseGoogleLogin'

// TODO: Add other social logins when available -> (NOTE: Create an array of objects with login options)

/**
 * This component renders button for social logins.
 * @important -> This components only displays a login option for google.
 * @returns {ReactElement} Renders a social login button.
 *
 * @example  <SocialLoginButton />
 */
const SocialLoginButton = () => {

  const { promptAsync } = useGoogleAuth();

  return (
    
    <Pressable 
      onPress={() => promptAsync()}
      style={({ pressed, focused }) => [
        socialLoginButtonStyles.button,
        pressed && socialLoginButtonStyles.pressed,
        focused && socialLoginButtonStyles.focused,
      ]}
    >
      <Icon size="lg"><GoogleIcon /></Icon>
      <Text style={socialLoginButtonStyles.text}>Continue with Google</Text>
    </Pressable>
  )
}

export default SocialLoginButton