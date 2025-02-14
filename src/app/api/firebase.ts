// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only connect to emulators in development (local environment)
// if (process.env.NODE_ENV === "development") {
//   const firestore = getFirestore(app);
//   const auth = getAuth(app);
//   const storage = getStorage(app);
//   const functions = getFunctions(app);

//   // Connect Firestore emulator
//   connectFirestoreEmulator(firestore, "localhost", 8080);
  
//   // Connect Auth emulator
//   connectAuthEmulator(auth, "http://localhost:9099");
  
//   // Connect Storage emulator
//   connectStorageEmulator(storage, "localhost", 9199);
  
//   // Connect Functions emulator
//   connectFunctionsEmulator(functions, "localhost", 5001);
// }

// Analytics only runs in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export all needed services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const functions = getFunctions(app);

export { analytics, auth, googleProvider, db, storage, functions };
