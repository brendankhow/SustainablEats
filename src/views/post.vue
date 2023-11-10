<template>
    <div class="recipe-details">
      <div class="recipe-image">
        <img :src="imageURL" alt="Recipe Image" />
      </div>

      <div class="recipeInfo container-fluid">
        <h2 class="recipeHeader d-inline-block ms-1">Recipe Details</h2>

        <div class="row mb-3 mt-2 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Recipe Name:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <span class="label-value">{{ recipe.name }}</span>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Creator:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <span class="label-value">{{ recipe.creator }}</span>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Meal Type:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <span class="label-value">{{ recipe.mealType }}</span>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Cuisine Type:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <span class="label-value">{{ recipe.cuisineType }}</span>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Description:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <p class="label-value">{{ recipe.description }}</p>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Ingredients:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <ol class="label-value">
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ index + 1 }}. {{ ingredient.name }} - {{ ingredient.quantity }}
              </li>
            </ol>
          </div>
        </div>

        <div class="row mb-3 ms-1">
          <label class="col-lg-2 col-md-12 col-form-label fw-bold">Steps:</label>
          <div class="col-lg-10 col-md-12 col-sm-12">
            <ol class="label-value">
              <li v-for="(step, index) in recipe.steps" :key="index">
                {{ index + 1 }}. {{ step.description }}
              </li>
            </ol>
          </div>
        </div>

        </div>
          <!-- <div class="recipe-image">
            <img :src="imageURL" alt="Recipe Image" />
          </div> -->
        </div>
        
    <hr>

    <div>
      <section id = "testimonials">
        <!--heading-->
        <div class = "testimonial-heading">
          <span>Reviews</span>
          <h1>Community Says</h1>
        </div>

        <!--Testimonials box container: User Reviews -->
        <div class = "testimonial-box-container">
            <!-- Use v-for to iterate through recentReviews array -->
            <div v-for="(review, index) in recentReviews.slice(-4).reverse()" :key="index">
              <div class="testimonial-box">
                <div class="box-top">
                  <div class="profile">
                    <div class="name-user">
                      <img class = "profilepic" :src = review.profilepic><strong>{{ review.username }}</strong> <!-- Display the user's username -->
                    </div>
                  </div>
                </div>
                <div class="client-comment">
                  <p>{{ review.review }}</p> <!-- Display the user's review -->
                </div>
              </div>
            </div>
            <p v-if="recentReviews.length === 0" class="no-reviews-message">No reviews currently</p>
        </div>
      </section>
    </div>

    <div>
      <div section id = "review">
        <div class = "container">
            <div class = "post" v-if = "iShowMessage">
              <div class = "text">Thank you for reviewing!</div>
            </div>

            <form v-on:submit.prevent>
              <header style = "color:seagreen;"><strong>Leave a Review!</strong></header>
              <div class = "textarea">
                <textarea cols="30" v-model="userReview" placeholder="Describe your experience.." maxlength="40"></textarea>
              </div>
              <p class="d-flex align-items-center justify-content-center text-center text-muted">Limit 40 characters per review</p>

              <div class = "btn">
                <button type = "submit" v-on:click="AddReview">Post</button>
              </div>

              <!-- Loading SPinner -->
              <div class="loading-row mx-auto">
                <div class="loading-content" v-if="loading">
                  <div class="loader"></div>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>


    <!--Poppins family font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:wght@900&display=swap" rel="stylesheet">
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getFirestore, doc, getDoc, collection, updateDoc, arrayUnion, query, orderBy, limit } from 'firebase/firestore';
  import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
  import { getAuth } from "firebase/auth";

  const route = useRoute();
  const recipe = ref({});
  const imageURL = ref('');
  const db = getFirestore();
  const recipeID = route.params.autoGeneratedID; // Get the recipeID from the route parameter
  const recipeRef = doc(db, 'recipes', recipeID); 
  var iShowMessage = ref(false);
  var userReview = ref("");
  const recentReviews = ref([]); // To store the four most recent reviews

  onMounted(async () => {
  const storage = getStorage();


  try {
    const recipeSnapshot = await getDoc(recipeRef);

    if (recipeSnapshot.exists()) {
      recipe.value = recipeSnapshot.data();
      const imageID = recipe.value.imageId; // Assuming the image ID is stored in the recipe data
      const fileName = `recipeImages/${imageID}`;
      const storageReference = storageRef(storage, fileName);
      const url = await getDownloadURL(storageReference);
      imageURL.value = `${url}?timestamp=${Date.now()}`; // Add a cache-busting query parameter
      const reviews = recipe.value.reviews;
      recentReviews.value = reviews; 
    } else {
      console.error('');
    }
  } 
  catch (error) {
    console.error('');
  }
});

  async function AddReview() {
  
    iShowMessage = true;
    const auth = getAuth();
    const user = auth.currentUser;
      if (user){
        const userID = user.uid;
        const timestamp = new Date().toISOString(); // Get the current date and time as a string\
        // Extract username
        var usersCollection = collection(db, "Users");
        const docRef = doc(usersCollection, userID); 
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists) 
        { 
            var username = docSnap.data().username;
            var profilepic = docSnap.data().profilepic;
        } 
        else 
        {
          console.log("");
        }
        try{
          await updateDoc(recipeRef, {
            // Use arrayUnion to add the new review to the "reviews" array
            reviews: arrayUnion({ 
              userID, 
              review: userReview.value,
              timestamp: timestamp,
              username: username,
              profilepic: profilepic
            }) // Add current timestamp 
          })

          // Update the local reviews array to reflect the newly added review
          recentReviews.value.push({
            userID,
            review: userReview.value,
            timestamp: timestamp,
            username: username,
            profilepic: profilepic,
          });          
          
          userReview.value = "";
          
        } 
        catch (error) {
          
          console.log('');
        }
      }
  }

</script>

<style scoped>

*{
  margin:0px;
  padding: 0px;
  font-family: poppins;
  box-sizing: border-box;
}

a{
  text-decoration: none;
}

.container{
  width: 400px;
  background: white;
  padding: 20px 30px;
  border: 1px solid #444;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#review{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:100%;
  margin-top: 30px;
}

form header{
  width: 100;
  font-size: 25px;
  color: #fe7;
  font-weight: 500;
  margin: 5px 0 20px 0;
  text-align: center;
  transition: all 0.2s ease;
}

form .textarea{
  height: 100px;
  width: 100%;
  overflow: hidden;
}

.container .text{
  font-size: 25px;
  color: #666;
  font-weight: 500;
}

form .textarea textarea{
  height: 100%;
  width: 100%;
  outline: none;
  color: black;
  border: 1px solid #333;
  background: white;
  padding: 10px;
  font-size: 17px;
  resize: none;
}

form .btn{
  height: 45px;
  width: 100%;
  margin: 15px 0;
}

form .btn button{
  height: 100%;
  width: 100%;
  outline: none;
  color: black;
  border: 1px solid #444;
  background: white;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 15px;
}

form .btn button:hover{
  background: seagreen;
}

#testimonials{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:100%;
}

.testimonial-heading{
  letter-spacing: 1px;
  margin: 30px 0px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.testimonial-heading h1{
  font-size: 2.2rem;
  font-weight: 500;
  background-color: #202020;
  color: #ffffff;
  padding: 10px 20px;
}

.testimonial-heading span{
  font-size: 1.3rem;
  color: #252525;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.no-reviews-message {
  text-transform: uppercase;
}
.testimonial-box-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.testimonial-box{
  width: 500px;
  box-shadow: 2px 2px 30px rgba(0,0,0,0.1);
  background-color: #ffffff;
  padding: 20px;
  margin: 15px;
  cursor: pointer;
}

.profilepic{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.profile-img{
  width:50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.profile{
  display: flex;
  align-items: center;

}

.name-user{
  display: flex;
}

.name-user strong{
  color: #3d3d3d;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.box-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.client-comment p {
  font-size: 0.9rem;
  color: #4b4b4b;
}

.recipe-details {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-top: 120px;
  margin-left: 50px;
}

.recipe-info {
  flex: 1;
  padding: 20px;
}

.recipeInfo{
  margin-left: 80px;
}

.recipeHeader{
  margin-bottom: 10px;
}

.recipe-image {
  width: 70%; /* Adjusted width for the image */
  margin-right: 50px; /* Added margin for spacing */
  margin-bottom: 50px;
}

.recipe-image img {
  width: 100%; /* Set your desired width to 100% for responsiveness */
  max-width: 100%; /* Updated maximum width */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.label-value {
  margin-left: 50px; /* Adjust the margin-left value according to your preference */
}

.loading-row,
.loading-content{
  height: 100%;
}

.loading-content{
  align-items: center;
  display: flex;
  justify-content: center;
}

.loader  {
  animation: rotate 1s infinite;  
  height: 50px;
  width: 50px;
}

.loader:before,
.loader:after {   
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;  
  width: 20px;
}
.loader:before {
  animation: ball1 1s infinite;  
  background-color: #cb2025;
  box-shadow: 30px 0 0 #f8b334;
  margin-bottom: 10px;
}
.loader:after {
  animation: ball2 1s infinite; 
  background-color: #00a096;
  box-shadow: 30px 0 0 #97bf0d;
}

@media (max-width: 1200px) {
  .recipe-details {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 992px) {
  .recipe-details {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .recipe-details {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 576px) {
  .recipe-details {
    flex-direction: column;
    align-items: center;
  }
  .recipe-info {
    margin-top: 20px;
  }

  .recipe-image {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .label-value {
    margin-left: 0;
  }
}

ul, ol {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>