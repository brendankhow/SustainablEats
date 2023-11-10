<template>
    <nav class="navbar navbar-expand-xl navbar-light fixed-top" style="background-color: white; border-bottom: 4px solid #25d366">
<div class="container-fluid ms-2">
  <router-link to="/home">
    <span class="navbar-brand">
      <img src="../assets/sustainablEats.png" alt="" width="50" height="50">
      <span class="ms-2">Sustainabl<font style="color:#25d366">Eats</font></span>
    </span>
  </router-link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse p-2" id="navbarSupportedContent" ref="navbar">
    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
      <li class="nav-item pe-3">
        <router-link to="/home" class="nav-link" @click="collapseNavBar">Home</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/explore" class="nav-link" @click="collapseNavBar">Explore</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/generateRecipe" class="nav-link" @click="collapseNavBar">AI Generation</router-link>
      </li>
      <li class="nav-item pe-3">
        <router-link to="/createRecipe" class="nav-link" @click="collapseNavBar">Create Recipe</router-link>
      </li>
    </ul>
    <ul class="navbar-nav mb-2 mb-lg-0" >
      <li class="nav-item d-flex align-items-center pe-3"> <!-- Once the moustache comes in, image disappear-->
          <img src="../assets/coin.png" width="40" height="40"><span class="fw-bold align-middle ps-1">{{ userCoins }} Coins</span>
      </li>

      <!-- Still can put image, just that there will be a distance between the coin and number
      <li class="nav-item  d-flex align-items-center mx-3">
        <span class=" align-middle ps-1">{{ userCoins}}</span>
      </li>-->

      <li class="nav-item d-flex align-items-center">
        <router-link to="/Profile" class="nav-link ">
          <img :src="profilepic" class="rounded-5" style="border:2px solid #25d366" alt="" width="50" height="50">
          <!-- Display user info when currentUser exists -->
          <span class=" align-middle ps-2 ">{{ username }}</span>
        </router-link>
      </li>
      <li class="nav-item d-flex align-items-center">
        <button @click="handleSignOut" class="btn logout_btn" style="background-color:#25d366; font-weight: bold" v-if="isLoggedIn">Log Out</button>
      </li>
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
          try{
            this.userCoins = doc.data().coins;
            this.username = doc.data().username;
            this.profilepic = doc.data().profilepic;
          }
          catch{
            console.log("");
          }
        });
      }
  },

  methods: {
    // This component uses the passed handleSignOut function to trigger log out
    handleSignOut() {
      this.handleSignOut(); // Remove the parentheses
    },
    collapseNavBar() {
      this.$refs.navbar.classList.remove('show');
    }
  },
};
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  .nav-link{
    font-weight: bold;
  }

  .btn{
    margin-left: 15px;
    border-radius: 10px;
  }

  .logout_btn:hover{
    color:white;
  }
  </style>
  