// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0pfOnn5qSHXT2CrKi2Bj0CVgy-5J67sI",
  authDomain: "threads-clone-4b217.firebaseapp.com",
  projectId: "threads-clone-4b217",
  storageBucket: "threads-clone-4b217.appspot.com",
  messagingSenderId: "693402318290",
  appId: "1:693402318290:web:34cacb2dfc76f0742f840b",
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
