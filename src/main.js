import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKiicOx4X-z8XU8lKy46JVDixOwtTNIXw",
  authDomain: "sustainableats-sg.firebaseapp.com",
  projectId: "sustainableats-sg",
  storageBucket: "sustainableats-sg.appspot.com",
  messagingSenderId: "839722725135",
  appId: "1:839722725135:web:68096618c2c6f3cd18587a"
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


