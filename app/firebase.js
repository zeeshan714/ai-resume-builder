import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4cPWZWJdgeeWPtpb-0VaQug7garl8-b8",
  authDomain: "ai-resume-builder-e74f1.firebaseapp.com",
  projectId: "ai-resume-builder-e74f1",
  storageBucket: "ai-resume-builder-e74f1.firebasestorage.app",
  messagingSenderId: "540688031793",
  appId: "1:540688031793:web:a5ebac1683f26c623c3510",
  measurementId: "G-D0YR3LYV8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

export default app;
