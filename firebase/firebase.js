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
  apiKey: "AIzaSyAaToR21BWFxk_H1kE4QK_0WiMyKylH30k",
  authDomain: "wad2-sustainableats.firebaseapp.com",
  databaseURL: "https://wad2-sustainableats-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wad2-sustainableats",
  storageBucket: "wad2-sustainableats.appspot.com",
  messagingSenderId: "426212590564",
  appId: "1:426212590564:web:6ec0973226002ae8dd7df1",
  measurementId: "G-9NB3QFRE4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp(app);

export { projectAuth, projectFirestore, timestamp };