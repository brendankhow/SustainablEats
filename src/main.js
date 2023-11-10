import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAzoP7u_p7GQ5vPiDzaWyqcsjicaVzw8gw",
  authDomain: "sustainableats-f.firebaseapp.com",
  projectId: "sustainableats-f",
  storageBucket: "sustainableats-f.appspot.com",
  messagingSenderId: "955126552293",
  appId: "1:955126552293:web:06e5283dd923cb464ca60c"
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


