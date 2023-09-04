// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdCDyipGk-fcjk90oofqsKuKJi_i6smbQ",
    authDomain: "hotel-booking-site-dbed7.firebaseapp.com",
    projectId: "hotel-booking-site-dbed7",
    storageBucket: "hotel-booking-site-dbed7.appspot.com",
    messagingSenderId: "2507184792",
    appId: "1:2507184792:web:d1ef7728250a447efcceed"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  auth =getAuth(app);

export default auth;


// npm install --save react-firebase-hooks