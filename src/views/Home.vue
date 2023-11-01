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
             <a class = "btn_get_started"> <router-link to="/generateRecipe" class = "link-white">Get Started</router-link></a>
       </div>
     </section>
 
     <!-- Trending Recipes Section -->
     <section id="trending">
    <div class="container">
      <div>
        <h1 style="text-align:center; color:black;">Trending Recipes</h1>
      </div>
      <div id="carouselExampleCaptions" class="carousel slide mt-5" data-bs-ride="false">
        <div class="carousel-inner">
          <div
            v-for="(recipe, index) in recipes"
            :key="recipe.id"
            :class="['carousel-item', { active: index === 0 }]">
            <img
              :src="recipe.recipeImageURLs"
              class="d-block w-100 carousel-image"
              alt="Recipe Image"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ recipe.creator }}</h5>
              <p>{{ recipe.description }}</p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" ariahidden="true"></span>
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

      <div class = "row mt-5 justify-content-center">
        <!-- Use v-for to loop through top3UsersCoins array -->
        <div class ="col-lg-4" v-for="(user, index) in top3UsersCoins" :key="index">
          <div class ="card ms-5 box-shadow bg-light">
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
  import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
  import { onMounted, ref} from 'vue';

  const db = getFirestore();
  const storage = getStorage();

  var top3UsersCoins = ref([]);
  const recipes = ref([]); // Store all recipes

  onMounted(async () =>{
    // Codes for Leaderboard Ranking => Retrieving from db
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
  
    // const recipeQuery = query(recipeSnapshot, orderBy("Likes", "desc"), limit(3)); // Can order in "likes" if implemented in future
    // Codes for Trending Recipes => Retrieving from Db + Image from Storage 
      const recipesRef = collection(db, 'recipes');
      const recipeSnapshot = await getDocs(recipesRef);

      recipes.value = recipeSnapshot.docs.map((doc) => ({
        creator: doc.creator,
        description: doc.description,
        image: getImageURL(doc.data().imageId), // Assign the image URL
        ...doc.data(),
      }));
      
  })
  
  // Get download url of images 
  const getImageURL = async (imageId) => {
    const imagesRef = storageRef(storage, `recipeImages/${imageId}`);
    try {
      return await getDownloadURL(imagesRef);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

 </script>
 
 <style> /* cannot put <style scoped>, otherwise elements in home page will not be center-aligned 
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
     background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(../assets/green.jpg);
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
 

.carousel-image {
  max-height: 650px; /* Adjust the max-height as needed */
  max-width: 900px;
  margin: auto;
  position: relative;
}

  /* Adjust the position of the carousel controls */
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%; /* Vertically center controls */
    transform: translateY(-50%);
    width: 10%; /* Adjust the control width as needed */
    background: rgba(0, 0, 0, 0.5); /* Control background color */
  }

  /* Style for the carousel control icons (optional) */
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: white; /* Control icon color */
  }
  
 #leaderboard{
     justify-content: center;
 }

 .link-white {
  color: white;
}
 </style>
 