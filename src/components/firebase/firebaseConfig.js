import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBCA4M-HFbdXhWK5gUwGVt7FC-He1NNMtk",
  authDomain: "wonderful-makeups-5590a.firebaseapp.com",
  projectId: "wonderful-makeups-5590a",
  storageBucket: "wonderful-makeups-5590a.appspot.com",
  messagingSenderId: "720734114329",
  appId: "1:720734114329:web:b2deeb5ff13df16866d088",
  measurementId: "G-92NVBX4E3S"
};

initializeApp(firebaseConfig);
export const storage = getStorage();

export const FIREBASE_DOMAIN = "https://wonderful-makeups-5590a-default-rtdb.europe-west1.firebasedatabase.app";

