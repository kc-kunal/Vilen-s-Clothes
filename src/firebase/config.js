import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBvA0tbdo2lxKtvYskz1C1x8kS6fjdjnVY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vilens-clothes.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vilens-clothes",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vilens-clothes.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "991617838473",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:991617838473:web:77ff6f8f36c1ca591c4558"
};

export const isFirebaseConfigured = Boolean(
  (import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey) && 
  (import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId)
);

let app = null;
let db = null;
let auth = null;
let googleProvider = null;

try {
  if (isFirebaseConfigured) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log("[Vilen's Clothes] Firebase Auth & Firestore connected successfully.");
  } else {
    console.info("[Vilen's Clothes] Running in local auth mode. Add VITE_FIREBASE_* in .env to connect live Firebase.");
  }
} catch (error) {
  console.warn("[Vilen's Clothes] Firebase init fallback:", error.message);
}

export { app, db, auth, googleProvider };
