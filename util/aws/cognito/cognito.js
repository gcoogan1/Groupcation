import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.EXPO_PUBLIC_COGNITO_POOL_ID,
  ClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID
}


export default new CognitoUserPool(poolData)