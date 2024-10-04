import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore"; 

import { db } from './firebaseConfig'


const addUser = async (userId, firstName, lastName, email) => {
  try {
    const docRef = doc(db, "users", userId);
    
    await setDoc(docRef, {
      firstName,
      lastName,
      email
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const updateUser = async (docId, firstName, lastName, email, city, country) => {
  try {
    const docRef = await updateDoc(collection(db, "users", docId), {
      firstName,
      lastName,
      email,
      city: city && '',
      country: country && ''
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default { addUser, updateUser }