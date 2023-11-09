import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBES-p70c7BohQFgJR-orW5mfWD-E6GxMM",
  authDomain: "sustainableats-3293a.firebaseapp.com",
  projectId: "sustainableats-3293a",
  storageBucket: "sustainableats-3293a.appspot.com",
  messagingSenderId: "95939921886",
  appId: "1:95939921886:web:28a41b9a068649311aff4f"
};

initializeApp(firebaseConfig);
const auth = getAuth()
const app = createApp(App);


app.use(router);
  // app.component("font-awesome-icon", FontAwesomeIcon);
app.mount ("#app");


export {app, auth}

// const app = createApp(App)

// app.use(router)

// app.mount ('#app')

// createApp(App).use(router).mount('#app')

