import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'vilens-clothes.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'vilens-clothes',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'vilens-clothes.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef'
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let app = null;
let db = null;

try {
  if (isFirebaseConfigured) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    console.log('[Vilen\'s Clothes] Firebase initialized successfully with Firestore database.');
  } else {
    console.info('[Vilen\'s Clothes] Running in local offline-first demo mode. Add VITE_FIREBASE_* in .env to connect live Firestore.');
  }
} catch (error) {
  console.warn('[Vilen\'s Clothes] Firebase init fallback:', error.message);
}

export { app, db };
