import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAqrLWmdQXxdcNlqFs7Gfc2cz1RiN0ldA8",
  authDomain: "sustainableats-890e0.firebaseapp.com",
  projectId: "sustainableats-890e0",
  storageBucket: "sustainableats-890e0.appspot.com",
  messagingSenderId: "447274079280",
  appId: "1:447274079280:web:0329248b0323a2c85909f5"
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

