// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-q5BNVwbyEjupFzcmcshLfR4ScxKPIKw",
  authDomain: "react-http-5b93a.firebaseapp.com",
  databaseURL: "https://react-http-5b93a-default-rtdb.firebaseio.com",
  projectId: "react-http-5b93a",
  storageBucket: "react-http-5b93a.appspot.com",
  messagingSenderId: "288168027450",
  appId: "1:288168027450:web:3807b08205ed47c9e51c03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth();
