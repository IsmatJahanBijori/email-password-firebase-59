// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGfp7qAwzd7KgwcC13eIhUObSnPHVP31A",
  authDomain: "email-password-firebase-59.firebaseapp.com",
  projectId: "email-password-firebase-59",
  storageBucket: "email-password-firebase-59.appspot.com",
  messagingSenderId: "562533623176",
  appId: "1:562533623176:web:e4c2b0e860de62da66463d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app