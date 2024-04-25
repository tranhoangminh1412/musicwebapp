// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCeFlHOmy5i5PVAacYNgsMxQzwgb_0sUp8",
  authDomain: "scf-firebase-1a7ac.firebaseapp.com",
  projectId: "scf-firebase-1a7ac",
  storageBucket: "scf-firebase-1a7ac.appspot.com",
  messagingSenderId: "991959863441",
  appId: "1:991959863441:web:e07d2e366a534c0a846f30",
  measurementId: "G-CMMQ3YXT05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage();
export const auth = getAuth();

const storageRef = ref(storage);

console.log(storageRef);

export const getFirebaseImage = async (fileName,setterFunc) => {
  const imagesRef = ref(storageRef, fileName);
  getDownloadURL(imagesRef).then((url) => {
    setterFunc(url)
  });
};
