<template>
    <nav class="navbar navbar-expand-xl navbar-dark fixed-top " style="background-color: #00563D;">
<div class="container-fluid ms-2">
  <router-link to="/home">
    <span class="navbar-brand">
      <img src="../assets/sustainablEats.png" alt="" width="50" height="50">
      <span class="ms-3">Sustainabl<font style="color:lawngreen">Eats</font></span>
    </span>
  </router-link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse p-2" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item pe-3">
        <router-link to="/home" class="nav-link text-white">Home</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/explore" class="nav-link text-white">Explore</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/generateRecipe" class="nav-link text-white">Generate Recipe</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/createRecipe" class="nav-link text-white">Create Recipe</router-link>
      </li>
    </ul>
    <ul class="navbar-nav me-5 mb-2 mb-lg-0" >

      <li class="nav-item text-white d-flex align-items-center pe-3 ">
        <a class="nav-link text-white" href="#">
          <img src="../assets/earned.png" width="30px">
          <span class="text-white align-middle ps-1"></span>
        </a>
      </li>

      <li class="nav-item text-white d-flex align-items-center pe-3 ms-5"> <!-- Once the moustache comes in, image disappear-->
          <img src="../assets/coin.png" width="30" height="30"><span class="text-white align-middle ps-1">{{ userCoins }}</span>
      </li>

      <!-- Still can put image, just that there will be a distance between the coin and number
      <li class="nav-item text-white d-flex align-items-center mx-3">
        <span class="text-white align-middle ps-1">{{ userCoins}}</span>
      </li>-->

      <li class="nav-item text-white d-flex align-items-center">
        <router-link to="/Profile" class="nav-link text-white">
          <img :src="profilepic" class="rounded-5" alt="" width="50" height="50">
          <!-- Display user info when currentUser exists -->
          <span class="text-white align-middle ps-2 ">{{ username }}</span>
        </router-link>
      </li>
      <button @click="handleSignOut" class="btn btn-outline-light" v-if="isLoggedIn">Log Out</button>
    </ul>
  </div>
</div>
</nav>

</template>
  
  <script >
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  import { getFirestore, collection, addDoc, updateDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
  import { getAuth } from "firebase/auth";

  export default {
  name: 'Navbar',
  props: {
    isLoggedIn: Boolean, // Define the isLoggedIn prop as a Boolean
    handleSignOut: Function, // Define the handleSignOut prop as a Function
    currentUser: Object, // Define the currentUser prop as an Object
  },
  
  data(){
    return{
      userCoins: 0,
      username: '',
      profilepic: null,

    }
  },

  async mounted(){
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user){
        const userID = user.uid;
        const userRef = doc(db, "Users", userID);
        /*
        const getUser = await getDoc(userRef);
        this.userCoins = getUser.data().coins; */
        onSnapshot(userRef, (doc) =>{
          this.userCoins = doc.data().coins;
          this.username = doc.data().username;
          this.profilepic = doc.data().profilepic;
        });
      }
  },

  methods: {
    // This component uses the passed handleSignOut function to trigger log out
    handleSignOut() {
      this.handleSignOut(); // Remove the parentheses
    }
  },
};
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  