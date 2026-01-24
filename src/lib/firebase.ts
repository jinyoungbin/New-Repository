import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0Y8Wk-v4Xn6DIxCit0ZJg-hqEI2nF5X0",
    authDomain: "pose-director-7572b.firebaseapp.com",
    projectId: "pose-director-7572b",
    storageBucket: "pose-director-7572b.firebasestorage.app",
    messagingSenderId: "1023017843056",
    appId: "1:1023017843056:web:d8cfdd26db251f1a3737b5",
    measurementId: "G-RFTJXTCQJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
