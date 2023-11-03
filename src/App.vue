<template>

    <!-- <router-link to="/home">Home</router-link> |
    <router-link to="/explore">Explore</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Sign In</router-link> |
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button> -->
    <div id="app">
      <!-- {{ isLoggedIn }} -->
      <Navbar :isLoggedIn="isLoggedIn" :handleSignOut="handleSignOut" v-if="isLoggedIn" />
  </div>
  <router-view/>
  <div id="app">
      <!-- {{ isLoggedIn }} -->
      <Footer :isLoggedIn="isLoggedIn" :handleSignOut="handleSignOut" v-if="isLoggedIn" />
  </div>
</template>

<script setup>
  import Navbar from './views/NavBar.vue'; // Import the Navbar component
  import Footer from './views/Footer.vue';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  import axios from 'axios';
  import { onMounted, ref } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

  import { useRouter } from "vue-router"; //•import router
  
  const router = useRouter(); // get a reference to our vue router

  const isLoggedIn = ref (false);

  let auth;
  onMounted (() =>{
    auth = getAuth();
    onAuthStateChanged (auth, (user) => {
      if (user) {
        isLoggedIn.value = true;

      } else {
        isLoggedIn.value = false;
      }
      });
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
    router.push("/");
    });
  };
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #2c3e50;
}

body{
  background: #FFFBF4;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
