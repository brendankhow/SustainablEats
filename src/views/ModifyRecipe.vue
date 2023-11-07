<template>
    <!-- intend to autofill with recipe data from GenerateRecipe -->
<div>
    <h1>askdnasdnasjdna</h1>
    <!-- <div>
      <input v-model="recipeDetails.recipeName" />
      <input v-model="recipeDetails.image" />
      <input v-model="recipeDetails.cuisineType"/>>
      <input v-model="recipeDetails.dietaryRestrictions"/>
      <input v-model="recipeDetails.prioritizedIngredients"/>
      <input v-model="recipeDetails.ingredientsArray"/>
      <input v-model="recipeDetails.instructionsArray"/>
    </div> -->
</div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  import { useRouter } from "vue-router";
  import axios from 'axios';
  // import OpenAI from 'openai';
export default {
    setup() { },
    data() { 
      
    },
    props: {
        // from generator, object
        // const recipeDetails = 
        // {
        //   recipeName: this.recipe.recipeName,
        //   image: this.recipe.image,
        //   cuisineType: this.recipe.cuisineType,
        //   dietaryRestrictions: this.recipe.dietaryRestrictions,
        //   prioritizedIngredients: this.recipe.prioritizedIngredients,
        //   ingredientsArray: this.recipe.ingredientsArray,
        //   instructionsArray: this.recipe.instructionsArray,
        // };
      recipeDetails: {
        type: Object,
        required: true,
      },
    },
    computed: {
        
    },
    methods: {
        
    }
  };
</script>
  