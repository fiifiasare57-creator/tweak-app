// Firebase Configuration for Tweaks App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  serverTimestamp,
  deleteDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// YOUR ACTUAL FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyDaoKir1Rd3KE0KsMOfzHuQEUfauycNzNM",
  authDomain: "tweak-app-937f0.firebaseapp.com",
  projectId: "tweak-app-937f0",
  storageBucket: "tweak-app-937f0.firebasestorage.app",
  messagingSenderId: "453556370573",
  appId: "1:453556370573:web:e697d6f90fec2ed7d9f6c4",
  measurementId: "G-M1T0QV3NQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Demo Videos (No Storage Required!)
const DEMO_VIDEOS = [
  {
    id: "demo1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-sunlight-529-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    username: "nature_lover",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nature",
    caption: "Peaceful forest stream 🌿 Find your calm",
    music: "Nature Sounds - Relaxing Vibes",
    likes: 12400,
    comments: 342,
    userId: "demo_nature"
  },
  {
    id: "demo2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400",
    username: "ocean_vibes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ocean",
    caption: "Endless ocean therapy 🌊 Let the waves heal you",
    music: "Ocean Dreams - Calm Mix",
    likes: 8700,
    comments: 215,
    userId: "demo_ocean"
  },
  {
    id: "demo3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mountains-and-forest-from-a-high-angle-32864-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    username: "mountain_spirit",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mountain",
    caption: "Above the clouds 🏔️ Perspective is everything",
    music: "Mountain Air - Cinematic",
    likes: 15600,
    comments: 489,
    userId: "demo_mountain"
  },
  {
    id: "demo4",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-skyline-at-night-41964-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400",
    username: "city_nights",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=city",
    caption: "City lights never sleep 🌃 Dream big",
    music: "Night Drive - Electronic",
    likes: 20300,
    comments: 756,
    userId: "demo_city"
  }
];

// Export all Firebase services
export {
  app,
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  serverTimestamp,
  deleteDoc,
  increment,
  DEMO_VIDEOS
};
