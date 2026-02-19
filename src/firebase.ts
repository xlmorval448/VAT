import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEU7KCUGWMxme3NTWgP0VBKleVldt-cXo",
    authDomain: "practica-valorant.firebaseapp.com",
    projectId: "practica-valorant",
    storageBucket: "practica-valorant.firebasestorage.app",
    messagingSenderId: "1004255714124",
    appId: "1:1004255714124:web:cdbd9ff72190250bfecde9",
    measurementId: "G-M4HJX2K04Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
