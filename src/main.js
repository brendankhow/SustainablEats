import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAtwvpyCxJJhknMlUZObDcoFrq4XlEumGQ",
  authDomain: "sustainableats1.firebaseapp.com",
  projectId: "sustainableats1",
  storageBucket: "sustainableats1.appspot.com",
  messagingSenderId: "725784684401",
  appId: "1:725784684401:web:28ecf52baeb0eff475f8d0"
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

