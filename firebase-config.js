// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
