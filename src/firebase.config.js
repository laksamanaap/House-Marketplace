// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// import { getFireStore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/compat/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzeuWFwe8sd84I7RNfQhP2BYQWZjAZuv4",
  authDomain: "housemarketplace-3713b.firebaseapp.com",
  projectId: "housemarketplace-3713b",
  storageBucket: "housemarketplace-3713b.appspot.com",
  messagingSenderId: "633180676496",
  appId: "1:633180676496:web:07902bfca2013783489315",
  measurementId: "G-F54VEX7Y3R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const getAuth = firebase.auth();
export const db = firebase.firestore();

// // export { getAuth, db };
