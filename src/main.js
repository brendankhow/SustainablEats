import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyARABgaDbrTWu4DhgEn4qebLmADMttcyvM",
    authDomain: "sustainableats-11dde.firebaseapp.com",
    projectId: "sustainableats-11dde",
    storageBucket: "sustainableats-11dde.appspot.com",
    messagingSenderId: "514630260415",
    appId: "1:514630260415:web:2aa18b23aa30a83a2bd80a"
  };

initializeApp(firebaseConfig);
const app = createApp(App);
app.use(router);
app.mount ("#app");

// const app = createApp(App)

// app.use(router)

// app.mount ('#app')

// createApp(App).use(router).mount('#app')

