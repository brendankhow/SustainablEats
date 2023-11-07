<template>
  <div class="outer-container">
    <div class="community-page">
      <!-- Side Navbar -->
      <nav class="side-navbar">
        <h3 class="sidebar-header">Meal Type</h3>
        <label class="form-check-label" style="display: block;" v-for="mealType in mealTypes" :key="mealType">
          <input type="checkbox" class="form-check-input" v-model="selectedMealTypes" :value="mealType" />{{ mealType }}
        </label>
        <button class="btn btn-primary" @click="applyFilters">Apply</button>
      </nav>

      <!-- Album Content -->
      <div class="album-container">
        <h1>Explore Recipes</h1>
        <br>
        <div class="recipe-grid">
          <RecipeCard
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            :recipe="recipe"
            class="recipe-card"
          />
        </div>
      </div>
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
    const url = await getDownloadURL(imagesRef);
    return `${url}?timestamp=${Date.now()}`; // Add a cache-busting query parameter
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
.outer-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  overflow: auto; /* Allow the entire page to scroll when needed */
}

.community-page {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.side-navbar {
  width: 250px;
  background-color: #EAFAFF;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  height: 100vh; /* Side navbar height remains fixed */
  overflow-y: auto; /* Allow scrolling within the side navbar */
}

/* Updated styles to align checkboxes */
.form-check-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-check-input {
  margin-right: 10px;
}

.album-container {
  flex: 1;
  padding: 20px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Create a grid layout with 3 columns per row */
  gap: 20px;
}

.recipe-card {
  border: none;
  transition: transform 0.2s;
  cursor: pointer;
}

.recipe-card:hover {
  transform: scale(1.02);
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

</style>