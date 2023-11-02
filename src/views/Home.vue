<template>
   <!-- Google Font-->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
   <!-- W3 schools Basic Icons-->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 
 
   <!-- Banner Section-->
   <section id="hero" class="d-flex align-item-center">
    <div class="video-container">
    <video autoplay muted loop>
      <source src="../assets/background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="overlay"></div>
  </div>
  <div class="container text-center">
    <h1>Building a <font style="color:#25D366">greener</font> and <font style="color:#FF3D00">wholesome</font> community through recipes</h1>
    <h2>Your culinary journey to a <font style="color:#25D366">greener</font> future starts here!</h2>
    <a class="btn_get_started">
      <router-link to="/generateRecipe" class="link-white">Get Started</router-link>
    </a>
  </div>
</section>

   <!-- About Us-->
<!-- About Us Section -->
<section id="about" class="about">
  <div class="container aos-init aos-animate" data-aos="fade-up">
    <div class="section-header">
      <h2>About Us</h2>
    </div>

    <div class="row gy-4">
      <div class="col-lg-6 d-flex align-items-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
        <div class="content ps-0 ps-lg-5">
          <h3 class="about-heading">Our Story</h3>
          <p class="about-description">
            With Singapore’s rising focus on tackling sustainability problems, the primary goal of SustainablEats is to empower individuals and build a positive community to make sustainable food choices and reduce wastage.
          </p>
          <ul class="about-list">
            <li>This application serves as a platform to facilitate the exchange of recipes and ideas among users while promoting sustainable food choices through AI-generated food recipes.</li>
          </ul>
        </div>
      </div>

      <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up">
        <div class="position-relative">
          <img src="../assets/aboutUs.jpg" class="img-fluid about-image" alt="About Us Image">
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

  <hr>
  
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

  <!-- ======= Events Section ======= -->
<section id="events" class="events">
      <div class="container-fluid" data-aos="fade-up">

        <div class="section-header">
          <h2>Events</h2>
          <p>Share <span>Your Moments</span> In Our Restaurant</p>
        </div>

        <div class="slides-3 swiper" data-aos="fade-up" data-aos-delay="100">
          <div class="swiper-wrapper">

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-1.jpg)">
              <h3>Custom Parties</h3>
              <div class="price align-self-start">$99</div>
              <p class="description">
                Quo corporis voluptas ea ad. Consectetur inventore sapiente ipsum voluptas eos omnis facere. Enim facilis veritatis id est rem repudiandae nulla expedita quas.
              </p>
            </div><!-- End Event item -->

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-2.jpg)">
              <h3>Private Parties</h3>
              <div class="price align-self-start">$289</div>
              <p class="description">
                In delectus sint qui et enim. Et ab repudiandae inventore quaerat doloribus. Facere nemo vero est ut dolores ea assumenda et. Delectus saepe accusamus aspernatur.
              </p>
            </div><!-- End Event item -->

            <div class="swiper-slide event-item d-flex flex-column justify-content-end" style="background-image: url(assets/img/events-3.jpg)">
              <h3>Birthday Parties</h3>
              <div class="price align-self-start">$499</div>
              <p class="description">
                Laborum aperiam atque omnis minus omnis est qui assumenda quos. Quis id sit quibusdam. Esse quisquam ducimus officia ipsum ut quibusdam maxime. Non enim perspiciatis.
              </p>
            </div><!-- End Event item -->

          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Events Section -->

    <footer id="footer" class="footer">

<div class="container">
  <div class="row gy-3">
    <div class="col-lg-3 col-md-6 d-flex">
      <i class="bi bi-geo-alt icon"></i>
      <div>
        <h4>Address</h4>
        <p>
          A108 Adam Street <br>
          New York, NY 535022 - US<br>
        </p>
      </div>

    </div>

    <div class="col-lg-3 col-md-6 footer-links d-flex">
      <i class="bi bi-telephone icon"></i>
      <div>
        <h4>Reservations</h4>
        <p>
          <strong>Phone:</strong> +1 5589 55488 55<br>
          <strong>Email:</strong> info@example.com<br>
        </p>
      </div>
    </div>

    <div class="col-lg-3 col-md-6 footer-links d-flex">
      <i class="bi bi-clock icon"></i>
      <div>
        <h4>Opening Hours</h4>
        <p>
          <strong>Mon-Sat: 11AM</strong> - 23PM<br>
          Sunday: Closed
        </p>
      </div>
    </div>

    <div class="col-lg-3 col-md-6 footer-links">
      <h4>Follow Us</h4>
      <div class="social-links d-flex">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>

  </div>
</div>

<div class="container">
  <div class="copyright">
    &copy; Copyright <strong><span class="ms-3">Sustainabl<font style="color:lawngreen">Eats</font></span></strong>. All Rights Reserved
  </div>
  <div class="credits">
  </div>
</div>

</footer><!-- End Footer -->
<!-- End Footer -->


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
      const q = query(usersCollection, orderBy("coins", "desc"), limit(3));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        top3UsersCoins.value.push({
        name: doc.data().username,
        coin: doc.data().coins,
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

#hero {
  position: relative;
  width: 100%;
  height: 70vh;
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

#hero .btn_get_started:hover {
  background-color: #009970;
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
 
/* Style for the carousel container */
#carouselExampleCaptions {
  max-width: 1200px; /* Set the maximum width as needed */
  margin: 0 auto;
}

/* Style for the carousel images */
.carousel-image {
  max-height: 550px; /* Adjust the maximum image height as needed */
  width: auto;
  margin: 0 auto;
  object-fit: cover; /* Maintain aspect ratio without distortion */
}

/* Center the carousel controls horizontally and vertically */
.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px; /* Adjust the control width as needed */
  background: rgba(0, 0, 0, 0.5);
  text-align: center; /* Center the control content horizontally */
  line-height: 50px; /* Center the control content vertically */
}

/* Style for the carousel control icons */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  color: white;
}
/* Style for the carousel items */
.carousel-item {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Add a background to the captions for readability */
.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}

/* Apply hover effect on carousel items */
.carousel-item:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
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
    background-color: #f9f9f9; /* Set a background color for the section */
    padding: 60px 0;
    overflow: hidden;
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
    margin-left: 20px;
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

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
.footer {
  font-size: 14px;
  background-color: #1f1f24;
  padding: 50px 0;
  color: rgba(255, 255, 255, 0.7);
}

.footer .icon {
  margin-right: 15px;
  font-size: 24px;
  line-height: 0;
}

.footer h4 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  color: #fff;
}

.footer .footer-links {
  margin-bottom: 30px;
}

.footer .footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer .footer-links ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.footer .footer-links ul li:first-child {
  padding-top: 0;
}

.footer .footer-links ul a {
  color: rgba(255, 255, 255, 0.6);
  transition: 0.3s;
  display: inline-block;
  line-height: 1;
}

.footer .footer-links ul a:hover {
  color: #fff;
}

.footer .social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
  transition: 0.3s;
}

.footer .social-links a:hover {
  color: #fff;
  border-color: #fff;
}

.footer .copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer .credits {
  padding-top: 4px;
  text-align: center;
  font-size: 13px;
}

.footer .credits a {
  color: #fff;
}
 </style>
 