// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBClRa2pAbGjzxtNPxM_dneLRfG4IvXcZc",
    authDomain: "agrivend-8443b.firebaseapp.com",
    projectId: "agrivend-8443b",
    storageBucket: "agrivend-8443b.firebasestorage.app",
    messagingSenderId: "731384254116",
    appId: "1:731384254116:web:42fa0d69ca04ee2de3e031",
    measurementId: "G-LWF520YXN3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
