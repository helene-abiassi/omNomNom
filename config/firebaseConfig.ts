import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey:"AIzaSyDy9ysE0IXSoMk7WE2qT44Nr3TKBu2vA2U",
  authDomain: "nnomnom-hln.firebaseapp.com",
  projectId: "onnomnom-hln",
  storageBucket: "onnomnom-hln.appspot.com",
  messagingSenderId: "211611816598",
  appId: "1:211611816598:web:acaf1d519f147640f128b7",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

