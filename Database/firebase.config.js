import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCeJT7mfjrNq03wWZRnCqUtAWqw-UO8TFQ",
  authDomain: "devgallery-2976e.firebaseapp.com",
  projectId: "devgallery-2976e",
  storageBucket: "devgallery-2976e.firebasestorage.app",
  messagingSenderId: "52181235690",
  appId: "1:52181235690:web:175cb28beaf460d18ba493"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
