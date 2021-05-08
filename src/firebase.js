import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
const config = {
  apiKey: "AIzaSyAkdLox6dv9C-ZiN4o3weJyCQOknoUnncs",
  authDomain: "vanhack-bdc0a.firebaseapp.com",
  projectId: "vanhack-bdc0a",
  storageBucket: "vanhack-bdc0a.appspot.com",
  messagingSenderId: "199575208476",
  appId: "1:199575208476:web:13af862d6baaa90b07d5d9"
};
// Initialize Firebase
firebase.initializeApp(config);
let firestore = firebase.firestore();
firestore.enablePersistence().then(() => {
  console.log("PErsistence Enabled!!")
}).catch(e => {
  console.error("Persistence NOT Enabled!!")
})
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export { firestore };
export { firebase };
export const storage = firebase.storage();
export const createUserDocument = async (user, additionalData) => {
  // If there is no user, let's not do this.
  if (!user) return;
  // Get a reference to the location in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);
  // Go and fetch a document from that location.
  const snapshot = await userRef.get();
  // If there isn't a document for that user. Let's use information
  // that we got from either Google or our sign up form.
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        role: "default",
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", console.error);
    }
  }
  // Get the document and return it, since that's what we're
  // likely to want to do next.
  return getUserDocument(user.uid);
};
export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection("users").doc(uid).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};