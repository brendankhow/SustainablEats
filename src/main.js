import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyARABgaDbrTWu4DhgEn4qebLmADMttcyvM",
    authDomain: "sustainableats-11dde.firebaseapp.com",
    projectId: "sustainableats-11dde",
    storageBucket: "sustainableats-11dde.appspot.com",
    messagingSenderId: "514630260415",
    appId: "1:514630260415:web:2aa18b23aa30a83a2bd80a"
  };

initializeApp(firebaseConfig);
const auth = getAuth()
const app = createApp(App);
app.use(router);
app.mount ("#app");

export {app, auth}

// const app = createApp(App)

// app.use(router)

// app.mount ('#app')

// createApp(App).use(router).mount('#app')

