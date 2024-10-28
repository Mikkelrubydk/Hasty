// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3NJ3xo4evhf8c7RRpf39ZXOXqvsZdBtg",
  authDomain: "hasty-f0e75.firebaseapp.com",
  databaseURL: "https://hasty-f0e75-default-rtdb.firebaseio.com",
  projectId: "hasty-f0e75",
  storageBucket: "hasty-f0e75.appspot.com",
  messagingSenderId: "808884210044",
  appId: "1:808884210044:web:e26344f98010a5aeccbcf9",
  measurementId: "G-QLWLT2SJ83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db, collection, addDoc }; // Export relevant Firebase modules
