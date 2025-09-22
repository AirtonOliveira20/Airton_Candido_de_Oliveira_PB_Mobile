import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBetvWji3v7IQJknz7Q6T692lGLMcMCE-M",
  authDomain: "at-7-8d615.firebaseapp.com",
  projectId: "at-7-8d615",
  storageBucket: "at-7-8d615.firebasestorage.app",
  messagingSenderId: "910831552094",
  appId: "1:910831552094:web:77128e1f1fc8aebeeed6cf",
};

//Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//Firestore
export const db = getFirestore(app);

export default app;
