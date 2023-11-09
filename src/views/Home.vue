<template>
   <!-- Google Font-->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
   <!-- W3 schools Basic Icons-->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 
 
   <!-- Banner Section-->
   <section id="hero" class="d-flex align-item-center container-fluid">
    <div class="video-container">
      <video autoplay muted loop>
        <source src="../assets/background.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="overlay"></div>
    </div>
    <div class="container text-center d-flex justify-content-center align-items-center flex-column">
      <h1>Building a <font style="color:#25D366">greener</font> and <font style="color:#FF3D00">wholesome</font> community through recipes</h1>
      <h2>Your culinary journey to a <font style="color:#25D366">greener</font> future starts here!</h2>
      <a class="btn_get_started">
        <router-link to="/generateRecipe" class="link-white">Get Started</router-link>
      </a>
      <div class="mt-2">
        <a href="#about"><span><img src="../assets/chevron-down.png" width="50" height="50"></span></a>
      </div>
    </div>
    
</section>

<!-- About Us Section -->
<section id="about" class="about animate-on-scroll text-center d-flex align-item-center justify-content-center p-5" style="background-color:#e0f0e1;">
  <div class="container aos-init aos-animate p-5 rounded-1" style="background-color:white" data-aos="fade-up">
    <div class="row">
      <div class="section-header">
        <h1>About Us</h1>
      </div>

      <div class="row gy-4 mt-2">
        <div class="col-lg-6 d-flex align-items-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
          <div class="content ps-0 ps-lg-5">
            <h3 class="about-heading">Our Story</h3>
            <p class="about-description">
              With Singapore’s rising focus on tackling sustainability problems, the primary goal of SustainablEats is to empower individuals and build a positive community to make sustainable food choices and reduce wastage.
            </p>
            <ul class="about-list">
              <li>This application serves as a platform to facilitate the exchange of recipes and ideas among users while promoting sustainable food choices through AI-generated food recipes.</li>
            </ul>
            <div class="mt-2">
              <a href="#trending"><span><button class="btn trending_btn">See Trending Recipes</button></span></a>
            </div>
          </div>
        </div>

        <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up">
          <div class="position-relative">
            <img src="../assets/aboutUs.jpg" class="img-fluid about-image" alt="About Us Image">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- Trending Recipes Section -->
<section id="trending">
  <div class="container">
    <div>
      <h1 style="text-align:center; color:black;">Trending Recipes</h1>
    </div>
    <div id="carouselExampleCaptions" class="carousel slide mt-5" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- recipe is an object that has the attributes as the one we created in database-->
        <div v-for="(recipe, index) in recipes" :key="recipe.id" :class="['carousel-item', { active: index === 0 }]">
          <div class="card">
            <img
            :src="recipe.recipeImageURLs"
            class="d-block carousel-image w-100"
            alt="Recipe Image" height="400" style="object-fit: cover;"/>
            <div class="card-body">
              <h3>Recipe Name: {{recipe.name}}</h3>
              <h5>Created by: {{ recipe.creator }}</h5>
              <p >Description: {{ recipe.description }}</p>
              <p class="text-muted">Likes: {{ recipe.likes }}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon p-2" aria-hidden="true" style="background-color: black; border-radius: 100px"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon p-2" ariahidden="true" style="background-color: black; border-radius: 100px"></span>
      </button>
      </div>
  </div>
</section>

  <hr class = "hr-styling" style="border: 3px solid #25D366">
  
    <!-- Leaderboard Ranking Pange-->
    <section id="leaderboard" style="background-color: #e0f0e1">
    <div class="container" >
      <div>
        <h1 style="text-align: center; color: black;">Leaderboard Ranking</h1>
        <h3 class="mt-3" style="text-align: center;">Top 3 users of the month:</h3>
      </div>

    <div class="row mt-5 justify-content-center">
      <div class="col-lg-4" v-for="(user, index) in top3UsersCoins" :key="index">
        <div class="card box-shadow mb-4" style="background-color: white; border: none; transition: transform 0.2s ease-in-out;">
          <div class="position-relative">
            <img class="card-img-top" :src="require(`@/assets/number${index}.jpg`)" alt="User Image" style="height: 300px; width: 100%; display: block; object-fit: cover;">
          </div>
          <hr style="border-color: #25d366;">
          <div class="card-body text-center">
            <h3 class="card-title" style="font-size: 24px; font-weight: 600; color: #333;">{{ user.name }}</h3>
            <div class="d-flex justify-content-center align-items-center mt-3">
              <img src="../assets/coin.png" alt="Coin Icon" style="height: 32px; width: 32px; display: inline-block; margin-right: 10px;">
              <h3 class="card-text" style="font-size: 24px; color: #25d366; display: inline-block;">{{ user.coin }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ======= Events Section ======= -->
<section id="events" class="events">
  <div class="container-fluid" data-aos="fade-up">
    <div class="section-header">
      <h2>United Nations Sustainable Development Goals(s)</h2>
      <p style="font-size: 25px">Savor Sustainability at SustainablEats</p>
    </div>

    <div class="slides-3 swiper" data-aos="fade-up" data-aos-delay="100">
      <div class="swiper-wrapper">
        <div class="swiper-slide event-item d-flex flex-column justify-content-end flip-card">
          <div class="flip-card-inner">
            <!-- Front of the card -->
            <div class="flip-card-front" style="background-image: url(../assets/background.png)">
              <h3>SDG 2: Zero Hunger</h3>
              <p class="description">
                Learn more about our efforts to combat hunger and food waste.
              </p>
            </div>
            <!-- Back of the card -->
            <div class="flip-card-back">
              <h3>SDG 2: Zero Hunger</h3>
              <p class="description">
                SustainablEats will feature an AI-powered recipe generator that accounts for users’ tastes and preferences based on the user’s input of ingredients.
              </p>
            </div>
          </div>
        </div>

        <!-- Repeat the above structure for the remaining cards -->

        <div class="swiper-slide event-item d-flex flex-column justify-content-end flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front" style="background-image: url(assets/img/events-2.jpg)">
              <h3>SDG 11: Sustainable Cities and Communities</h3>
              <p class="description">
                Explore our commitment to building sustainable communities.
              </p>
            </div>
            <div class="flip-card-back">
              <h3>SDG 11: Sustainable Cities and Communities</h3>
              <p class="description">
                Sustainable recipes often emphasize using all parts of ingredients and minimizing waste.
              </p>
            </div>
          </div>
        </div>

        <div class="swiper-slide event-item d-flex flex-column justify-content-end flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front" style="background-image: url(assets/img/events-3.jpg)">
              <h3>SDG 12: Responsible Consumption and Production</h3>
              <p class="description">
                Discover how we support responsible consumption and sustainable production.
              </p>
            </div>
            <div class="flip-card-back">
              <h3>SDG 12: Responsible Consumption and Production</h3>
              <p class="description">
                Sustainable recipes promote the use of environmentally friendly ingredients, such as organic and locally sourced produce.
              </p>
            </div>
          </div>
        </div>

        <div class="swiper-slide event-item d-flex flex-column justify-content-end flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front" style="background-image: url(assets/img/events-3.jpg)">
              <h3>SDG 13: Climate Action</h3>
              <p class="description">
                Learn how we contribute to climate action and reducing food waste.
              </p>
            </div>
            <div class="flip-card-back">
              <h3>SDG 13: Climate Action</h3>
              <p class="description">
                By facilitating and encouraging the sharing of sustainable food recipes, food waste would be reduced which helps lower methane emissions from landfills.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
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
  var recipes = ref([]); // Store all recipes

  onMounted(async () =>{
    // Codes for Leaderboard Ranking => Retrieving from db
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection, orderBy("coins", "desc"), limit(3));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        top3UsersCoins.value.push({
        name: doc.data().username,
        coin: doc.data().coins,
        });
      });
  
    
    // Codes for Trending Recipes => Retrieving Top 5 Highest Liked Recipes from Db + Image from Storage 
      const recipesRef = collection(db, 'recipes');
      const qRecipe = query(recipesRef, orderBy("likes", "desc"), limit(5));

      const recipeSnapshot = await getDocs(qRecipe);
      recipeSnapshot.forEach((doc) => {
        recipes.value.push({
          ...doc.data()
        })
      })
      console.log(recipes);
      
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
 
 <style>



 /* HR styling */
 
 /* CSS template */
 .trending_btn:hover {
  background-color: #24a152;
  color:white;
  font-family: Raleway;
  font-weight: bold;
  padding: 10px 20px;
  box-shadow: 0 0 0 0 rgba(8, 136, 8, 0.7);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
 }
 .trending_btn {
  background-color: #25D366;
  font-family: Raleway;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 30px;
 }

 html {
  scroll-behavior: smooth;
}
 
 ::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar track */
}

/* Customize the thumb (the draggable part of the scrollbar) */
::-webkit-scrollbar-thumb {
  background: #5fc496; /* Color of the thumb */
  border-radius: 5px; /* Rounded corners for the thumb */
}

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

#hero {
  position: relative;
  width: 100%;
  height: 100vh;
}

#hero .video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

#hero .video-container video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

#hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Adjust the opacity (0.4) to your preference */
  z-index: 0;
}

#hero .container {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 80px;
}

#hero h1 {
  font-size: 48px;
  font-weight: 900; /* Increased font weight for a bolder look */
  line-height: 1.2; /* Adjusted line height for better readability */
  color: #fff;
  margin: 50px 0 10px 0;
}

#hero h2 {
  color: #eee;
  font-size: 18px; /* Larger font size for emphasis */
  font-weight: 400;
  font-family: "Raleway", sans-serif; /* Consistent font with the heading */
  letter-spacing: 1px; /* Increased letter-spacing for a professional touch */
  text-transform: uppercase;
  margin-top: 20px;
}

#hero .btn_get_started {
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: 600; /* Bolder font weight for buttons */
  font-size: 14px; /* Larger font size for buttons */
  letter-spacing: 2px; /* Increased letter-spacing for buttons */
  display: inline-block;
  padding: 12px 32px; /* Increased padding for buttons */
  border-radius: 50px;
  margin: 20px 10px; /* Adjusted margin for spacing */
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  transition: 0.6s all;
}
/* Animation */

@-webkit-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-moz-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@-ms-keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}
#hero .btn_get_started:hover {
  box-shadow: 0 0 0 0 rgba(8, 136, 8, 0.7);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  text-decoration: none !important;
  transition: all 300ms ease-in-out;
  background-color: #25d366;
  border: 2px solid #009970;
  color: #fff;
}

/* Adjusts height of carousel container */

#trending{
    width: 100%;
    height: 100vh;     
}
#trending .container{
    padding-top: 10px;
}

/* CSS for Leaderboard Section */
#leaderboard {
  background-color: #e0f0e1;
  padding: 60px 0;
}

#leaderboard .container {
  text-align: center;
}

#leaderboard h1 {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-top: 30px;
}

#leaderboard h3 {
  font-size: 24px;
  font-weight: 600;
  color: #25d366;
  margin-top: 10px;
}

#leaderboard .row {
  margin-top: 50px;
}

#leaderboard .card {
  background-color: #fff;
  border: none;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
}

#leaderboard .card img {
  height: auto;
  max-width: 100%;
  display: block;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#leaderboard .card hr {
  border-color: #25d366;
}

#leaderboard .card-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

#leaderboard .card-text {
  font-size: 24px;
  color: #25d366;
}

#leaderboard .card:hover {
  transform: scale(1.02);
}

/* Responsive Styling */
@media (max-width: 768px) {
  #leaderboard .card {
    margin-bottom: 20px;
  }

  #leaderboard .card img {
    height: auto;
    max-width: 100%;
  }
}

.link-white {
color: white;
}


/*--------------------------------------------------------------
# About Section
--------------------------------------------------------------*/
  /* About Us Section */
  .about {
    background-color: #e0f0e1;
    padding: 60px 0;
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about h2 {
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 30px;
    font-family: 'Raleway', sans-serif;
  }

  .about .call-us {
    position: relative;
    background-color: #fff;
    box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.08);
    padding: 20px;
    text-align: center;
  }

  .about .call-us h4 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    font-family: 'Raleway', sans-serif;
  }

  .about .call-us p {
    font-size: 28px;
    font-weight: 700;
    color: #25D366; /* Green color for emphasis */
  }

  .about .content ul {
    list-style: none;
    padding: 0;
  }

  .about .content ul li {
    padding: 0 0 8px 26px;
    position: relative;
  }

  .about .content ul i {
    position: absolute;
    font-size: 20px;
    left: 0;
    top: -3px;
    color: #FF3D00; /* Red color for icons */
  }

  .about .content p:last-child {
    margin-bottom: 0;
  }

  .about .position-relative {
    position: relative;
  }

  .about .position-relative img {
    max-height: 400px;
    width: 100%;
    display: block;
    object-fit: cover; /* Maintain image aspect ratio */
  }

  .about-heading {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333; /* Change the text color */
}

.about-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #555; /* Change the text color */
  max-width: 600px; /* Set a maximum width as needed */
  margin-left: auto; /* Center the container horizontally */
  margin-right: auto; /* Center the container horizontally */
}
.about-list {
  list-style: none;
  padding-left: 0;
}

.about-list li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
}

.about-list i {
  position: absolute;
  left: 0;
  top: 3px;
  font-size: 20px;
  color: #25D366; /* Green color for icons */
}

.about-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 575px){
  .about-image {
    max-width: 100%;
  }
}
/* Style for the Events Section */
#events {
  background-color: #f9f9f9;
  padding: 60px 0;
  overflow: hidden;
}

#events .container-fluid {
  text-align: center;
}

#events h2 {
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 30px;
  font-family: 'Raleway', sans-serif;
  color: #333;
}

#events p {
  font-size: 18px;
  font-weight: 400;
  color: #555;
  margin-top: 20px;
}

.events .slides-3 {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
}

.events .swiper-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
}

.events .swiper-slide {
  flex-shrink: 0;
  width: calc(25% - 40px); /* 25% width with spacing between items for full-screen */
  margin: 20px;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.events .swiper-slide h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.events .swiper-slide .price {
  font-size: 20px;
  font-weight: 700;
  color: #25D366;
}

.events .swiper-slide .description {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.events .swiper-pagination {
  margin-top: 20px;
  text-align: center;
}

.events .swiper-pagination .swiper-pagination-bullet {
  background: #333;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
}

.events .swiper-pagination .swiper-pagination-bullet-active {
  background: #25D366;
}

.events .swiper-slide:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1200px) {
  .events .swiper-slide {
    width: calc(33.33% - 40px); /* 33.33% width with spacing between items for large screens */
  }
}

@media (max-width: 992px) {
  .events .swiper-slide {
    width: calc(50% - 40px); /* 50% width with spacing between items for medium screens */
  }
}

@media (max-width: 768px) {
  .events .swiper-slide {
    width: calc(50% - 20px); /* 50% width with reduced spacing between items for smaller screens */
  }
}

@media (max-width: 576px) {
  .events .swiper-slide {
    width: 100%; /* Full width for the smallest screens */
  }
}

/* CSS for card flip effect */
.flip-card {
  perspective: 1000px;
  position: relative;
  cursor: pointer;
}

.flip-card-inner {
  width: 100%;
  height: 400px; /* Set your desired height here */
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-size: cover; /* Adjust background size to fill the card */
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.flip-card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background-color: #fff; /* Customize the background color of the back of the card */
  color: #333; /* Customize the text color of the back of the card */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.flip-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.flip-card p {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

/* Style pagination bullets (optional) */
.swiper-pagination .swiper-pagination-bullet {
  background: #333;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: #25D366;
}

 </style>
 