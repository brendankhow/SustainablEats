// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARABgaDbrTWu4DhgEn4qebLmADMttcyvM",
    authDomain: "sustainableats-11dde.firebaseapp.com",
    projectId: "sustainableats-11dde",
    storageBucket: "sustainableats-11dde.appspot.com",
    messagingSenderId: "514630260415",
    appId: "1:514630260415:web:2aa18b23aa30a83a2bd80a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp(app);

export { projectAuth, projectFirestore, timestamp };