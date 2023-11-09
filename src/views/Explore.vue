<template>
  <div class="outer-container">
    <div class="community-page">
      <!-- Side Navbar -->
      <nav class="side-navbar">
        <h3 class="sidebar-header">Meal Type</h3>
        <label class="form-check-label" v-for="mealType in mealTypes" :key="mealType">
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
  overflow: auto;
  margin-top: 80px;
}

.community-page {
  flex-direction: column; /* Change to column layout on small screens */
}

.side-navbar {
  width: 100%; /* Occupy full width on small screens */
  max-width: 250px; /* Limit width on larger screens */
  margin-bottom: 20px; /* Add some space between sidebar and album on small screens */
}

.album-container {
  flex: 1;
  padding: 20px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.side-navbar {
  display: flex;
  flex-direction: row; /* Set to row by default */
  justify-content: space-between; /* Add space between items */
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.form-check-label {
  margin-right: 10px;
}

.form-check-input {
  margin-right: 8px;
}

.btn-primary {
  margin-top: 10px;
}
/* Your existing styles remain unchanged */

@media (max-width: 1200px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .recipe-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .recipe-grid {
    grid-template-columns: 1fr;
  }
  .side-navbar {
    flex-direction: column;
    align-items: center;
  }
}
</style>
