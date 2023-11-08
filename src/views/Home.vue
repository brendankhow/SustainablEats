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
              <a href="#trending"><span><button class="btn trending_btn">See Trending</button></span></a>
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
    <div id="carouselExampleCaptions" class="carousel slide mt-5" data-bs-ride="false">
      <div class="carousel-inner">
        <!-- recipe is an object that has the attributes as the one we created in database-->
        <div v-for="(recipe, index) in recipes" :key="recipe.id" :class="['carousel-item', { active: index === 0 }]">
          <div class="card" style="border-left: 25px solid #25d366">
            <img
            :src="recipe.recipeImageURLs"
            class="d-block carousel-image"
            alt="Recipe Image" height="500" style="width: 100%; object-fit: cover;"/>
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

  <hr style="border: 3px solid #25D366">
  
    <!-- Leaderboard Ranking Pange-->
    <section id="leaderboard" style="background-color: #e0f0e1">
    <div class="container" >
      <div>
        <h1 style="text-align: center; color: black;">Leaderboard Ranking</h1>
        <h3 class="mt-3" style="text-align: center;">Top 3 users of the month:</h3>
      </div>

      <div class = "row mt-5 justify-content-center">
        <!-- Use v-for to loop through top3UsersCoins array -->
        <div class ="col-lg-4" v-for="(user, index) in top3UsersCoins" :key="index">
          <div class ="card box-shadow mb-4" style="background-color:white">
            <!-- Use user.name and user.coin to display dynamic data -->
            <img class="card-img-top" :src="require(`@/assets/number${index}.jpg`)"
             style="height: 300px; width: 100%; display: block">
             <hr>
            <div class="card-body text-center">
              <h3 class="card-title">{{ user.name }}</h3>
              <img class="mx-2" src="../assets/coin.png" style="height: 50px; width: 50px; display: inline;">
              <h3 class="card-text" style="display: inline-block">{{ user.coin }}</h3>
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
            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(../assets/background.png)">
              <h3>SDG 2: Zero Hunger</h3>
              <p class="description">
                SustainablEats will feature an AI-powered recipe generator that accounts for users’ tastes and preferences based on the user’s input of ingredients.
              </p>
            </div><!-- End Event item -->

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-2.jpg)">
              <h3>SDG 11: Sustainable Cities and Communities</h3>
              <p class="description">
                Sustainable recipes often emphasise using all parts of ingredients and minimising waste.
              </p>
            </div><!-- End Event item -->

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-3.jpg)">
              <h3>SDG 12: Responsible Consumption and Production</h3>
              <p class="description">
                Sustainable recipes promote the use of environmentally friendly ingredients, such as organic and locally sourced produce.
              </p>
            </div><!-- End Event item -->

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-3.jpg)">
              <h3>SDG 13: Climate Action: </h3>
              <p class="description">
                By facilitating and encouraging the sharing of sustainable food recipes, food waste would be reduced which helps lower methane emissions from landfills.              
              </p>
            </div><!-- End Event item -->

          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Events Section -->




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
 /* CSS template */
 .trending_btn:hover {
  background-color: #24a152;
  color:white;
 }
 .trending_btn {
  background-color: #25D366;
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

#leaderboard{
    justify-content: center;
    
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
    max-width: 80%;
  }
}
/* Style for the Events Section */
#events {
  background-color: #f9f9f9; /* Set a background color for the section */
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
  color: #333; /* Change the text color */
}

#events p {
  font-size: 18px;
  font-weight: 400;
  color: #555; /* Change the text color */
  margin-top: 20px;
}

.events .slides-3 {
  max-width: 1200px; /* Set the maximum width as needed */
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
}

.events .swiper-wrapper {
  display: flex;
  justify-content: center;
}

.events .swiper-slide {
  flex-shrink: 0;
  width: 100%;
  max-width: 300px; /* Adjust the maximum width as needed */
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  text-align: center;
  padding: 20px;
}

.events .swiper-slide h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333; /* Change the text color */
}

.events .swiper-slide .price {
  font-size: 20px;
  font-weight: 700;
  color: #25D366; /* Green color for emphasis */
}

.events .swiper-slide .description {
  font-size: 16px;
  color: #555; /* Change the text color */
  margin-top: 10px;
}

/* Style for the swiper pagination dots */
.events .swiper-pagination {
  margin-top: 20px;
  text-align: center;
}

.events .swiper-pagination .swiper-pagination-bullet {
  background: #333; /* Color of the pagination dots */
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%; /* Make the pagination dots circular */
  cursor: pointer;
}

.events .swiper-pagination .swiper-pagination-bullet-active {
  background: #25D366; /* Color of the active pagination dot */
}

/* Apply hover effect on event items */
.events .swiper-slide:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

 </style>
 