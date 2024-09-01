// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB-5qrcKrpSImK35ntsxRoWuGhlvtbBKW4",
  authDomain: "multimart-56129.firebaseapp.com",
  projectId: "multimart-56129",
  storageBucket: "multimart-56129.appspot.com",
  messagingSenderId: "981386780770",
  appId: "1:981386780770:web:af70be601ee690e6e9f13b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage =getStorage(app);

export default app