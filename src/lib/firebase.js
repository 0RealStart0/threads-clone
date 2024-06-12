// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET_KEY,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function getDocumentData(query) {
  const docSnap = await getDoc(query);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function getCollectionData(query) {
  const querySnapshot = await getDocs(query);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), docId: doc.id };
    });
    return data;
  } else {
    return [];
  }
}
