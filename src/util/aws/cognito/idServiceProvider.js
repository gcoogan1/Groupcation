import AWS from "aws-sdk";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, COGNITO_POOL_ID } from '@env';
import poolData from "./cognito";
import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

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

export const getCurrentUserId = async (email) => {

  const user = poolData.getCurrentUser();

  if (!user) {
    console.warn("No user session found. User might not be logged in.");
    return null; // You can handle this case (e.g., redirect to login)
  }

  console.log(user);
  

  try {
    const session = await new Promise((resolve, reject) => {
      user.getSession((err, session) => (err ? reject(err) : resolve(session)));
    });

    // Retrieve and return the user ID (sub) from the ID token
    const userId = session.getIdToken().payload.sub;
    return userId;
  } catch (error) {
    console.error("Error retrieving user ID:", error.message);
    throw new Error("Failed to retrieve the current user ID.");
  }
  
  // try {
  //   const session = await new Promise((resolve, reject) => {
  //     user.getSession((err, session) => (err ? reject(err) : resolve(session)));
  //   });

  //   console.log("session.getIdToken().payload.sub", session.getIdToken().payload.sub);
    

  //   return session.getIdToken().payload.sub; // Return the user's ID
  // } catch (error) {
  //   console.error("Error retrieving user ID:", error.message);
  //   throw new Error("Failed to retrieve user ID"); // Throw a user-friendly error
  // }
};