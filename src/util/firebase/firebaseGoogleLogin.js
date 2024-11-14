import { useContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDORID_CLIENT_ID } from "@env";

import { auth } from "./firebaseConfig";
import { addUser } from "./firebaseServices";
import { AuthContext } from "../../state/authContext";
import { checkEmailExists } from "../aws/cognito/idServiceProvider";

// Complete the web browser auth session (required for Expo)
WebBrowser.maybeCompleteAuthSession();

const addGoogleUser = async (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);

    const user = result.user;
    const firstName = user.displayName.split(" ")[0];
    const lastName = user.displayName.split(" ")[1] || "";
    const email = user.email;

    const userExists = await checkEmailExists(email);

    if (userExists) {
      return { status: 200, message: "User has been successfully retrieved." };
    }

    await addUser(user.uid, firstName, lastName, email);
    return { status: 200, message: "User has been successfully added." };
  } catch (error) {
    console.error("Error adding user:", error.message);
    return { status: 500, message: error.message };
  }
};

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDORID_CLIENT_ID,
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      (async () => {
        const result = await addGoogleUser(id_token);
        if (result.status === 200) {
          authContext.authenticate(id_token);
          return;
        } else {
          return;
        }
      })();
    }
  }, [response]);

  return { promptAsync };
};
