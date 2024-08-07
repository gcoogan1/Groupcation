import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { COGNITO_POOL_ID, COGNITO_CLIENT_ID } from '@env';

// NOTE: all env variables MUST begin with EXPO_PUBLIC
const poolData = {
  UserPoolId: COGNITO_POOL_ID,
  ClientId: COGNITO_CLIENT_ID
}


export default new CognitoUserPool(poolData)