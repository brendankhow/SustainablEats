<template>
    <nav class="navbar navbar-expand-xl navbar-dark" style="background-color: #002e23;">
<div class="container-fluid ms-2">
  <img src="" width="50px">
  <a class="navbar-brand ms-2 text-white" href="index.html">SustainablEats</a>
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
        <a class="nav-link text-white" href="community.html">Explore HTML</a>
      </li>
      <li class="nav-item pe-3">
        <a class="nav-link text-white" href="generate_receipe.html">Generate Recipe</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#">Create Post</a>
      </li>
    </ul>
    <ul class="navbar-nav me-5 mb-2 mb-lg-0" >
      <li class="nav-item text-white d-flex align-items-center pe-3 ">
        <a class="nav-link text-white" href="#">
          <img src="" width="30px">
          <span class="text-white align-middle ps-1">50</span>
        </a>
      </li>
      <li class="nav-item text-white d-flex align-items-center pe-3">
        <a class="nav-link text-white" href="#">
          <img src="" width="30px">
          <span class="text-white align-middle ps-1">50</span>
        </a>
      </li>
      <li class="nav-item text-white d-flex align-items-center">
        <a class="nav-link text-white" href="#">
          <img src="" class="rounded-5" width="50px">
          <span class="text-white align-middle ps-1">Math_Cat</span>
        </a>
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
  export default {
  name: 'Navbar',
  props: {
    isLoggedIn: Boolean, // Define the isLoggedIn prop as a Boolean
    handleSignOut: Function, // Define the handleSignOut prop as a Function
  },
  methods: {
    // This component uses the passed handleSignOut function to trigger log out
    handleSignOut() {
  this.handleSignOut(); // Remove the parentheses
},

  },
};
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  