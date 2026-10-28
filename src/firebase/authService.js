import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  updateProfile, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';

const LOCAL_USER_KEY = 'vilens_auth_user';
const REGISTERED_USERS_KEY = 'vilens_registered_accounts';

/**
 * Helper to get local mock user
 */
export const getLocalUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

/**
 * Register New User
 */
export const registerUser = async (name, email, password) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    const cleanUser = {
      uid: userCredential.user.uid,
      displayName: name || userCredential.user.displayName || email.split('@')[0],
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL || null
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  } else {
    // Simulated Local Registration for instant offline testing
    const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    const existing = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('This email is already registered in Vilen\'s Crew. Please log in.');
    }
    const newUser = {
      uid: 'vilen-user-' + Date.now(),
      displayName: name || email.split('@')[0],
      email: email.toLowerCase(),
      password: password, // For mock verification
      createdAt: new Date().toISOString()
    };
    registered.push(newUser);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered));

    const cleanUser = {
      uid: newUser.uid,
      displayName: newUser.displayName,
      email: newUser.email,
      photoURL: null
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  }
};

/**
 * Login with Email and Password
 */
export const loginUser = async (email, password) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const cleanUser = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName || email.split('@')[0],
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL || null
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  } else {
    // Simulated Local Login
    const registered = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
    const found = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Auto-allow or verify password
    if (found && found.password && found.password !== password) {
      throw new Error('Incorrect password. Please try again or reset password.');
    }

    const cleanUser = {
      uid: found ? found.uid : 'vilen-user-' + Date.now(),
      displayName: found ? found.displayName : email.split('@')[0],
      email: email.toLowerCase(),
      photoURL: null
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  }
};

/**
 * Login with Google
 */
export const loginWithGoogle = async () => {
  if (isFirebaseConfigured && auth && googleProvider) {
    const result = await signInWithPopup(auth, googleProvider);
    const cleanUser = {
      uid: result.user.uid,
      displayName: result.user.displayName || 'Vilen VIP',
      email: result.user.email,
      photoURL: result.user.photoURL || null
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  } else {
    // Simulated Google Login for demo
    const cleanUser = {
      uid: 'google-vip-' + Date.now(),
      displayName: 'Streetwear VIP (Google)',
      email: 'vip.member@gmail.com',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
    return cleanUser;
  }
};

/**
 * Send Password Reset Email
 */
export const resetPassword = async (email) => {
  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email);
    return true;
  } else {
    // Mock password reset
    console.log('[Mock Auth] Password reset link simulated for:', email);
    return true;
  }
};

/**
 * Logout User
 */
export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(LOCAL_USER_KEY);
  return true;
};

/**
 * Subscribe to Auth State Changes
 */
export const subscribeToAuth = (callback) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const cleanUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(cleanUser));
        callback(cleanUser);
      } else {
        localStorage.removeItem(LOCAL_USER_KEY);
        callback(null);
      }
    });
  } else {
    // Initial local user check
    const local = getLocalUser();
    callback(local);
    return () => {};
  }
};
