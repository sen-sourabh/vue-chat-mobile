// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDq8QxDDZ1eQJIAbcQbeKtEmyY_Yv0_I5M",
  authDomain: "letschat-a7989.firebaseapp.com",
  projectId: "letschat-a7989",
  storageBucket: "letschat-a7989.appspot.com",
  messagingSenderId: "272386597956",
  appId: "1:272386597956:web:d84a4453c629b10e680811"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }