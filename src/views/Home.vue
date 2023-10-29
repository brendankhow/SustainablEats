<template>
  <div class="container-fluid p-0">
    <div class="banner">
      <img src="../assets/banner.jpg" class="img-fluid">
      <div class="content-box">
        <div class="text-content">
          <h2>Building a<font style="color: #25D366;"> GREENER </font>and<font style="color:#FF3D00"> wholesome </font>community though recipes </h2>
          <button class="generateButton">Try our AI Recipe Generator >>></button>
        </div>
        <div class="image-content">
          <img src="../assets/pokebowl(1).jpg" alt="Your Image">
        </div>
      </div>
    </div>
  </div>
  <!-- Album Content -->
  <div class="album-container">
    <br>
        <h1>Top Recipes</h1>
        <br>
        <div class="row">
          <RecipeCard
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            :recipe="recipe"
            class="col-md-3"
          />
        </div>
      </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

const db = getFirestore();
const recipes = ref([]); // Store all recipes
const storage = getStorage();
const recipeImages = ref({});
const selectedMealTypes = ref([]);
const mealTypes = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Supper'];

onMounted(async () => {
  const recipesRef = collection(db, 'recipes');
  const querySnapshot = await getDocs(recipesRef);

  recipes.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    image: getImageURL(doc.data().imageId), // Assign the image URL
    ...doc.data(),
  }));
  // Initialize filteredRecipes with all recipes on page load
  filteredRecipes.value = recipes.value;
});

const getImageURL = async (imageId) => {
  const imagesRef = storageRef(storage, `recipeImages/${imageId}`);
  try {
    return await getDownloadURL(imagesRef);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

const applyFilters = () => {
  // This method is called when you click the "Apply" button.
  // Filter recipes based on selected meal types.
  filteredRecipes.value = recipes.value.filter((recipe) => {
    return selectedMealTypes.value.length === 0 || selectedMealTypes.value.includes(recipe.mealType);
  });
};

const filteredRecipes = ref([]);
</script>

<script>
import RecipeCard from '@/views/RecipeCard.vue';

export default {
  components: {
    RecipeCard,
  },
};
</script>

<style>
.container-fluid {
  position: relative;
  padding: 0;
}

.banner {
  width: 100%;
  height: 600px; /* Set the desired height for your banner */
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
}

.content-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90%;
}

.generateButton {
  background-color: #00563D;
  color: white;
  margin-top: 30px;
  border-radius: 20px; /* Adjust the value to control the roundness of corners */
  border: none;
  padding: 10px 20px; /* You can adjust the padding as needed */
  cursor: pointer;
  transition: background-color 0.3s;
  width: 80%;
}

.generateButton:hover {
  background-color: #003824; /* Change the background color on hover */
}

.text-content {
  width: 70%; /* Adjust the width for text content */
  text-align: left; /* Align text to the left */
  margin-left: 3%;
}

h2 {
  font-size: 48px;
  margin: 0;
}

p {
  font-size: 16px;
  margin: 0;
}

.image-content {
  width: 30%; /* Adjust the width for image content */
  text-align: right; /* Align image to the right */
  margin-right: 3%;
}

.image-content img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .content-box {
    flex-direction: column; /* Stack elements in a column on smaller screens */
    text-align: center; /* Center-align content on smaller screens */
  }
  .text-content, .image-content {
    width: 100%; /* Full width for text and image on smaller screens */
    text-align: center; /* Center-align text and image on smaller screens */
  }
}
</style>
