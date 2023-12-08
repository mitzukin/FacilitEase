// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase,ref, push, update, get, onValue, set } from 'firebase/database'; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-r7aT5MfmehboyIRcTjslSs6l_8ed-kk",
  authDomain: "react-auth-405ce.firebaseapp.com",
  projectId: "react-auth-405ce",
  storageBucket: "react-auth-405ce.appspot.com",
  messagingSenderId: "319132914828",
  appId: "1:319132914828:web:5524e2b59bbab5f2d017a9"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getDatabase(app);  // Update the initialization

// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': '0000-000000@rtu.edu.ph'
});

export { auth, provider, db, ref, push, update, get, onValue, set };