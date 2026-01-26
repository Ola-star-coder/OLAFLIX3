// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoeCW7tuFHEHTJLxPelR6Etgp0qVQK-MM",
  authDomain: "tvflix-app.firebaseapp.com",
  projectId: "tvflix-app",
  storageBucket: "tvflix-app.firebasestorage.app",
  messagingSenderId: "416648872222",
  appId: "1:416648872222:web:21ec64acb236f04a83c90f",
  measurementId: "G-9JNJ3L56CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);