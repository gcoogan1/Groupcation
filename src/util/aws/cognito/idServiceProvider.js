import AWS from "aws-sdk";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, COGNITO_POOL_ID } from '@env';

// NOTE: all env variables MUST begin with EXPO_PUBLIC
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const checkEmailExists = async (email) => {
  try {
    const params = {
      UserPoolId: COGNITO_POOL_ID,
      Filter: `email = "${email}"`,
      Limit: 1,
    };

    const result = await cognito.listUsers(params).promise();

    return result.Users.length > 0; // Email exists
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};

export const isUserConfirmed = async (email) => {
  try {
    const params = {
      UserPoolId: COGNITO_POOL_ID,
      Filter: `email = "${email}"`,
      Limit: 1,
    };

    const result = await cognito.listUsers(params).promise();

    if (result.Users[0].UserStatus === 'UNCONFIRMED') {
      return false
    }

    return true;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}