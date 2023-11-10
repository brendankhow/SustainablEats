import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAGzAPjAnfQ9mxRIJq4U2vVwwwy2pluexo",
  authDomain: "sustainableats-final.firebaseapp.com",
  projectId: "sustainableats-final",
  storageBucket: "sustainableats-final.appspot.com",
  messagingSenderId: "933428708070",
  appId: "1:933428708070:web:0e87eda6c99f1c0a78f127"
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


