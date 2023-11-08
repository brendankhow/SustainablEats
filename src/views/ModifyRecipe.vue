<template>
    <!-- intend to autofill with recipe data from GenerateRecipe -->
<div>

    <div class="modify-recipe">
      <h1>Edit Recipe</h1>

      <!--  -->
      <form class="recipe-form" @submit.prevent>
        <!-- Recipe Name Input -->
          <div class="form-group">
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" :value="recipeDetails.recipeName"/>
          </div>

        <!-- Image Upload Field -->
        <!-- AI-generated image is shown by default; button to replace image with file upload -->
          <div class="form-group">
            <label for="recipeImg">Recipe Image:</label>
            <!-- Display the AI-generated image if 'isChosen' is true -->
            <img v-if="isChosen" :src="recipeDetails.image" alt="Recipe Image">
            <!-- Button to toggle the image selection -->
            <button @click="toggleImageSelection">{{ isChosen ? 'Replace Image' : 'Use AI-generated Image' }}</button>
            <!-- Input for image selection -->
            <input v-if="!isChosen" type="file" id="recipeImage" @change="onImageSelection" accept="image/*"  />
          </div>

          <div class="form-group">
            <label for="recipeIngredients">Ingredients:</label><br>
            <div v-for="(ingredient, i) in recipeDetails.ingredientsArray" :key="i">
              <div v-if="editingIndex !== i">
                <span>{{ ingredient }}</span>
                <button @click="startEditing(i)">Edit</button>
              </div>
              <div v-else>
                <input v-model="editedIngredient" @input="updateIngredient" @blur="stopEditing" />
                <button @click="confirmEdit(i)">Confirm</button>
              </div>
            </div>
            <!-- {{ recipeDetails.ingredientsArray }} -->
          </div>

          <div class="form-group">
            <label for="recipeInstructions">Steps:</label><br>
            <div v-for="(instruction, j) in recipeDetails.instructionsArray" :key="j">
              <span>{{ instruction }}</span>
            </div>
          </div>
        <!-- Redirect to ? -->
        <button type="submit">Save Changes</button>
      </form>
    </div>

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
    return {
      // hardcoded for easier testing (setting up page-page link)
      // recipeDetails represent sample recipe data sent from GenerateRecipe.vue when user presses 'edit'
      
      recipeDetails:
        {
          "recipeName": " Classic Spaghetti Carbonara\n\n",
          "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-D12V1pcCP5fIMJP2UaFzZwOD/user-FpsBNmRJpxtxaxY6LCQSuzQd/img-hZW4cDH2ZGPlyrmrQVfnFLWJ.png?st=2023-11-08T03%3A13%3A11Z&se=2023-11-08T05%3A13%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-08T03%3A50%3A03Z&ske=2023-11-09T03%3A50%3A03Z&sks=b&skv=2021-08-06&sig=PzZHyjbf%2Bi1FMBVUPymcZFdpoVbnO8cyYiCbftWwJo0%3D",
          "ingredientsArray": [
              "- 8 ounces spaghetti pasta",
              "4 slices of bacon, chopped",
              "2 cloves garlic, minced",
              "2 large eggs",
              "1/2 cup grated Parmesan cheese",
              "Salt and pepper, to taste",
              "Fresh parsley, chopped (for garnish)"
          ],
          "instructionsArray": [
              "1. Cook the spaghetti pasta according to package instructions until al dente. Drain and set aside.",
              "2. In a large skillet, cook the bacon over medium heat until crispy. Remove the bacon from the skillet and set aside, leaving the rendered fat in the skillet.",
              "3. In the same skillet with the bacon fat, add the minced garlic and sauté for about 1 minute until fragrant.",
              "4. In a medium bowl, whisk together the eggs and grated Parmesan cheese. Add salt and pepper to taste.",
              "5. Pour the cooked spaghetti into the skillet with the garlic and toss well to coat the pasta with the bacon fat.",
              "6. Remove the skillet from heat and slowly pour the egg and cheese mixture into the spaghetti, stirring constantly to combine. The residual heat will cook the eggs but be careful not to scramble them.",
              "7. Add the cooked bacon to the skillet and toss to combine all the ingredients evenly.",
              "8. Garnish with fresh parsley and serve immediately.",
              "Note: This classic spaghetti carbonara recipe does not typically contain nuts and is focused on highlighting the flavor of eggs. However, it's always important to double-check the labels of your ingredients to ensure they are nut-free and safe for your allergies."
          ]
        },
      isChosen: true,

      editingIndex: -1, // Track the index being edited
      editedIngredient: "", // Store the edited ingredient

    }
    },
    props: {

    },
    computed: {
        
    },
    methods: {
      toggleImageSelection() {
        this.isChosen = !this.isChosen;
      },
      startEditing(index) {
        this.editingIndex = index; // Enable editing for the clicked item
        this.editedIngredient = this.recipeDetails.ingredientsArray[index];
      },
      stopEditing() {
        this.editingIndex = -1; // Disable editing
        this.editedIngredient = "";
      },
      confirmEdit(index) {
        this.recipeDetails.ingredientsArray[index] = this.editedIngredient; // Update the ingredient
        this.stopEditing(); // Disable editing
      },
    }
  };
</script>
  