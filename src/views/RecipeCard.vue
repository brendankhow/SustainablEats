<!-- views/RecipeCard.vue -->
<template>
    <div class="card">
      <img :src="recipe.recipeImageURLs" class="card-img-top" alt="Recipe Image" style="width: 100%; height: 100%; object-fit: cover">
      <div class="card-body">
        <h5 class="card-title">{{ recipe.name }}</h5>
        <p class="card-text">{{ recipe.creator }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: Object,
    },
  };
  </script>
  
  