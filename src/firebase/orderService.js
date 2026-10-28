import { db, isFirebaseConfigured } from './config';
import { collection, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';

const STORAGE_ORDERS_KEY = 'vilens_saved_orders';

export const saveOrder = async (orderData) => {
  const timestamp = new Date().toISOString();
  const orderWithMeta = {
    ...orderData,
    createdAt: timestamp,
    status: 'Confirmed - Preparing for Dispatch (24h)',
    trackingNumber: 'VILEN-' + Math.floor(100000 + Math.random() * 900000)
  };

  // 1. Always save in localStorage for instant tracking & persistence
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY) || '[]');
    existing.unshift(orderWithMeta);
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Local order save error:', err);
  }

  // 2. If Firebase is active, persist in cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderWithMeta,
        serverTime: serverTimestamp()
      });
      orderWithMeta.firestoreId = docRef.id;
      console.log('Order synced with Firebase Firestore ID:', docRef.id);
    } catch (firebaseErr) {
      console.warn('Firebase order push failed, retained in local database:', firebaseErr);
    }
  }

  return orderWithMeta;
};

export const getLocalOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ORDERS_KEY) || '[]');
  } catch (err) {
    return [];
  }
};

export const trackOrderByQuery = (query) => {
  const orders = getLocalOrders();
  if (!query) return null;
  const qClean = query.trim().toUpperCase();
  return orders.find(o => 
    (o.orderId && o.orderId.toUpperCase() === qClean) ||
    (o.trackingNumber && o.trackingNumber.toUpperCase() === qClean) ||
    (o.customer && o.customer.mobile && o.customer.mobile.includes(qClean))
  ) || null;
};
