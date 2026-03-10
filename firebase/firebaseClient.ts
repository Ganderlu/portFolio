// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// `https://firebase.google.com/docs/web/setup#available-libraries`

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5bmtfzyJnbmc9ZF606z_H6g9NY3qxmko",
  authDomain: "portfolio-4520b.firebaseapp.com",
  projectId: "portfolio-4520b",
  storageBucket: "portfolio-4520b.firebasestorage.app",
  messagingSenderId: "583618124716",
  appId: "1:583618124716:web:1669a31f995826d83ab809",
  measurementId: "G-MW83QVSBC4",
};

// Initialize Firebase (checking if already initialized to avoid errors in Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Analytics is only supported in the browser
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, db };
