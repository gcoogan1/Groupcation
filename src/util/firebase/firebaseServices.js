import axios from "axios";
import {
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth, db } from "./firebaseConfig";

// Firestore Helpers
const addUser = async (userId, firstName, lastName, email) => {
  console.log("add user");
  
  try {
    const docRef = doc(db, "users", userId);
    const response = await setDoc(docRef, {
      firstName,
      lastName,
      email,
    });

    return { status: 200, message: response };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const updateUser = async (docId, firstName, lastName, email, city, country) => {
  try {
    const docRef = doc(db, "users", docId); // Fixed the document reference
    const response = await updateDoc(docRef, {
      firstName,
      lastName,
      email,
      city: city || "",
      country: country || "",
    });
    return { status: 200, message: response };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Auth Helpers
const sendConfirmationEmail = async (email) => {
  try {
    const response = await axios.post(
      "https://us-central1-groupcation-32951.cloudfunctions.net/sendVerificationCode",
      { email }
    );
    return { status: 200, message: response.data };
  } catch (error) {
    return {
      status: 500,
      message: `Error sending code: ${error.response.data}`,
    };
  }
};

const sendResetPasswordCode = async (email) => {
  try {
    const response = await axios.post(
      "https://us-central1-groupcation-32951.cloudfunctions.net/sendResetPasswordCode",
      { email }
    );
    return { status: 200, message: response.data };
  } catch (error) {
    return {
      status: 500,
      message: `Error sending code: ${error.response.data}`,
    };
  }
};

const signUpAndStoreUser = async (email, firstName, lastName, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    // Store user in Firestore
    const data = await addUser(userId, firstName, lastName, email);
    console.log("DATA", data);
    

    // Optionally send a confirmation email here if you need to
    await sendConfirmationEmail(userCredential.user.email);

    return { status: 200, message: userId };
  } catch (error) {
    console.log("error", error);
    
    return { status: 500, message: error.message };
  }
};

const loginUser = async (email, password) => {
  try {
    const userConfirmed = await userIsConfirmed(email);

    if (!userConfirmed) return { status: 404, message: "UserNotConfirmed" };

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const accessToken = await user.getIdToken();

    return { status: 200, message: "Success", data: accessToken };
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return { status: 400, message: "InvalidCreds" };
    }

    return { status: 500, message: error.message };
  }
};

const signOutUser = async () => {
  try {
    const response = await signOut(auth);
    return { status: 200, message: "User signed out" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

// Collection Types: verificationCodes or resetPasswordCodes
const validateVerificationCode = async (email, code, collectionType) => {
  try {
    const response = await axios.post(
      "https://us-central1-groupcation-32951.cloudfunctions.net/validateVerificationCode",
      { email, code, type: collectionType }
    );

    if (response.status === 200)
      return { status: 200, message: "Account is verified." };

    return { status: response.status, message: response.response.data };
  } catch (error) {
    return {
      status: 500,
      message: `Error validating code: ${error.response.data}`,
    };
  }
};

const userExists = async (email) => {
  try {
    const response = await axios.post(
      "https://us-central1-groupcation-32951.cloudfunctions.net/checkEmailExists",
      { email }
    );

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};

const userIsConfirmed = async (email) => {
  try {
    const response = await axios.post(
      "https://us-central1-groupcation-32951.cloudfunctions.net/checkIfCodeIsVerified",
      { email }
    );
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export {
  signUpAndStoreUser,
  loginUser,
  sendConfirmationEmail,
  sendResetPasswordCode,
  validateVerificationCode,
  userExists,
  userIsConfirmed,
  signOutUser,
  addUser
};
