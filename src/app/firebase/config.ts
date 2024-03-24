import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmk3B8aWi2zFD6KUm_5ZixN-8ZiOhrcUI",
  authDomain: "adassist-137f3.firebaseapp.com",
  projectId: "adassist-137f3",
  storageBucket: "adassist-137f3.appspot.com",
  messagingSenderId: "61977405571",
  appId: "1:61977405571:web:843fb389711e9ae2f513b6",
  measurementId: "G-9T1ZLR2ZRD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleprovider = new GoogleAuthProvider();

export const db = getFirestore(app);
