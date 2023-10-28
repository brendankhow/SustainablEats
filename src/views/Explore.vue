<template>
  <div class="community-page">
    <div class="community-content">
      <!-- Side Navbar -->
      <nav class="side-navbar">
        <h3 class="sidebar-header">Meal Type</h3>
        <label class="form-check-label" style="display: block;">
          <input type="checkbox" class="form-check-input" v-model="breakfast" @change="filterItems" /> Breakfast
        </label>
        <label class="form-check-label" style="display: block;">
          <input type="checkbox" class="form-check-input" v-model="brunch" @change="filterItems" /> Brunch
        </label>
        <label class="form-check-label" style="display: block;">
          <input type="checkbox" class="form-check-input" v-model="lunch" @change="filterItems" /> Lunch
        </label>
        <label class="form-check-label" style="display: block;">
          <input type="checkbox" class="form-check-input" v-model="dinner" @change="filterItems" /> Dinner
        </label>
        <label class="form-check-label" style="display: block;">
          <input type="checkbox" class="form-check-input" v-model="supper" @change="filterItems" /> Supper
        </label>
      </nav>

      <div class="container">
        <h1>Explore Recipes</h1>
        <div class="row">
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
            class="col-md-4"
          />
        </div>
      </div>
  

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';

const db = getFirestore();
const recipes = ref([]);
const storage = getStorage();
const recipeImages = ref({});

onMounted(async () => {
  const recipesRef = collection(db, 'recipes');
  const querySnapshot = await getDocs(recipesRef);

  recipes.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    image: getImageURL(doc.data().uniqueID), // Assign the image URL
    ...doc.data(),
  }));
});

const getImageURL = async (uniqueID) => {
  const imagesRef = storageRef(storage, `recipeImages/${uniqueID}`);
  try {
    return await getDownloadURL(imagesRef);
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
</script>

<script>
import RecipeCard from '@/views/RecipeCard.vue';

export default {
  components: {
    RecipeCard,
  },
};
</script>

<!-- <style>
.community-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.community-content {
  display: flex;
  flex-direction: row;
}

.side-navbar {
  width: 250px; /* Adjust the width as needed */
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* Margin between navbar and album */
}

/* Your existing styles for the album */
.album-container {
  margin-left: 20px;
}

.card {
  border: none;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}
</style> -->