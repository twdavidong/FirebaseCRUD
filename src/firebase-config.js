// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_MU5pelPUKoPGicgscd8QpESZllLck_c",
  authDomain: "temp-app-103b6.firebaseapp.com",
  projectId: "temp-app-103b6",
  storageBucket: "temp-app-103b6.appspot.com",
  messagingSenderId: "1054459331992",
  appId: "1:1054459331992:web:ca820d29669f53a01b97ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);