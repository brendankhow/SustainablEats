<template>
   <!-- Google Font-->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
   <!-- W3 schools Basic Icons-->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 
 
   <!-- Banner Section-->
   <section id = "hero" class = "d-flex align-item-center">
       <div class = "container text-center">
         <h1> Building a greener and wholesome community through recipes </h1>
           <h2> Your culinary journey to a greener future starts here! </h2>
             <a class = "btn_get_started"> <router-link to="/generateRecipe">Get Started</router-link></a>
       </div>
     </section>
 
     <!-- Trending Recipes Section -->
     <section id = "trending">
       <div class = "container">
         <div><h1 style = "text-align:center; color:black;">Trending Recipes</h1></div>
         <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
           <div class="carousel-indicators">
             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
             <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
           </div>
           <div class="carousel-inner">
             <div class="carousel-item active">
               <img src="../assets/pokebowl.jpg" class="d-block w-100 carousel-image" alt="...">
               <div class="carousel-caption d-none d-md-block">
                 <h5>First slide label</h5>
                 <p>Some representative placeholder content for the first slide.</p>
               </div>
             </div>
             <div class="carousel-item">
               <img src="../assets/pokebowl.jpg" class="d-block w-100 carousel-image" alt="...">
               <div class="carousel-caption d-none d-md-block">
                 <h5>Second slide label</h5>
                 <p>Some representative placeholder content for the second slide.</p>
               </div>
             </div>
             <div class="carousel-item">
               <img src="../assets/pokebowl.jpg" class="d-block w-100 carousel-image" alt="...">
               <div class="carousel-caption d-none d-md-block">
                 <h5>Third slide label</h5>
                 <p>Some representative placeholder content for the third slide.</p>
               </div>
             </div>
           </div>
           <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Previous</span>
           </button>
           <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
             <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Next</span>
           </button>
         </div>
       </div>
     </section>
 
     <!-- Leaderboard Ranking Pange-->
     <section id="leaderboard">
    <div class="container">
      <div>
        <h1 style="text-align: center; color: black;">Leaderboard Ranking</h1>
        <h5 class="mt-3" style="text-align: center; color: grey;">Top 3 users of the month:</h5>
      </div>

      <div class="row mt-5 justify-content-center">
        <!-- Use v-for to loop through top3UsersCoins array -->
        <div class="col-md-4" v-for="(user, index) in top3UsersCoins" :key="index">
          <div class="card ms-5 box-shadow bg-light">
            <!-- Use user.name and user.coin to display dynamic data -->
            <img class="card-img-top" :src="require(`@/assets/number${index}.jpg`)"
             style="height: 300px; width: 100%; display: block">
             <hr>
            <div class="card-body">
              <h3 class="card-title">{{ user.name }}</h3>
              <h3 class="card-text" style="display: inline-block">{{ user.coin }}</h3>
              <img class="mx-2" src="../assets/coin.png" style="height: 75px; width: 25%; display: inline;">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

 </template>
 
 <script setup>
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.min.js';
   import { useRouter } from "vue-router";
   import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
   import { onMounted, ref} from 'vue';

   const db = getFirestore();

   var top3UsersCoins = ref([]);

   onMounted(async () =>{
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection, orderBy("Coin", "desc"), limit(3));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        top3UsersCoins.value.push({
        name: doc.data().name,
        coin: doc.data().Coin,
        });
      });
      console.log(top3UsersCoins);
  })
 </script>
 
 <style>
 /* CSS template */
 
 /* Reset default margin and padding for all elements */
 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
 }
 
 a {
     text-decoration: none;
 }
 
 a:hover{
     text-decoration: none;
 }
 
 h1,h2,h3,h4,h5,h6 {
     font-family: "Raleway", sans-serif;
 } 
 
 section{
     padding: 60px 0;
     overflow: hidden;
 }
 /* Set a background color for the entire page */
 
 /* Style the header section */
 header {
     background-color: #333;
     color: #fff;
     padding: 10px;
     text-align: center;
 }
 
 main {
     padding: 20px;
 }
 
 /* Style footer section */
 footer {
     background-color: #333;
     color: #fff;
     text-align: center;
     padding: 10px;
 }
 
 /** Banner Section CSS **/
 #hero{
     width: 100%;
     height: 100vh; /* vertical height */
     background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(../assets/dog_toast.jpg);
     background-position: center;
     background-size: cover;
     background-repeat: no-repeat;
     background-attachment: fixed;
 }
 
 #hero .container{
     padding-top: 80px;
 }
 
 #hero h1{
     font-size: 48px;
     font-weight: 700;
     line-height: 56px;
     color: #fff;
     margin: 0 0 10px 0;
 }
 
 #hero h2{
     color: #eee;
     margin-bottom: 40px;
     font-size: 15px;
     font-weight: 400;
     font-family: "Open-Sans", sans-serif;
     letter-spacing: 0.5px;
     text-transform: uppercase;
 }
 
 #hero .btn_get_started{
     font-family: "Poppins", sans-serif;
     text-transform: uppercase;
     font-weight: 500;
     font-size: 14px;
     letter-spacing: 1px;
     display: inline-block;
     padding: 8px 28px;
     border-radius: 50px;
     margin: 10px;
     border: 2px solid #fff;
     background-color: transparent;
     color: #fff;
     transition: 0.6s all;
 }
 
 #hero .btn_get_started:hover{
     background-color: #009970;
     border: 2px solid #009970;
 }
 
 /* Adjusts height of carousel container */
 
 #trending{
     width: 100%;
     height: 130vh;
 }
 #trending .container{
     padding-top: 80px;
 }
 
 .carousel-image{
     height: 100vh;
 }
 
 /* Adjusts all carousel images in the carousel id #carouselExampleCaptions
 #carouselExampleCaptions{
     width: 80%;
 }
 
 
 #carouselExampleCaptions .carousel-image img{
     display: block;
     margin: 0 auto;
 }
 */
 
 .card {
     width: 18rem;
 }
  
 #leaderboard{
     justify-content: center;
 }
 </style>
 