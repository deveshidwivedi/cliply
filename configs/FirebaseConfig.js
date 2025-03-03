// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "cliply-20f33.firebaseapp.com",
  projectId: "cliply-20f33",
  storageBucket: "cliply-20f33.firebasestorage.app",
  messagingSenderId: "329948597862",
  appId: "1:329948597862:web:48be7de47a14d4745967a7",
  measurementId: "G-SS46G9LVFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage= getStorage(app);