import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";

// Firebase web configuration from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyDKRg6WRjSztyLdxIjJpEnGQHnka0RxI-I",
  authDomain: "heroic-exchanger-j224x.firebaseapp.com",
  projectId: "heroic-exchanger-j224x",
  storageBucket: "heroic-exchanger-j224x.firebasestorage.app",
  messagingSenderId: "1053740665568",
  appId: "1:1053740665568:web:dd146ad770ad6ac0dc1e85",
};

// Lazy initialization of Firebase services
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (e) {
  console.error("Firebase initialization failed:", e);
}

export const firebaseApp = app;

export const auth = app ? getAuth(app) : null;

export const db = app 
  ? getFirestore(app, "ai-studio-f881c6e7-1eeb-4bd5-b69d-d455e536742f")
  : null;
