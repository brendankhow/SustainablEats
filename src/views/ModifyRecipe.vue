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
            <input v-model="editedName" type="text" id="recipeName" :placeholder="recipeDetails.recipeName" @blur="stopEditingName" @input="updateRecipeName" />
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
              <div v-if="editingIngredientIndex !== i">
                <span>{{ ingredient }}</span>
                <button @click="startEditingIngredient(i)">Edit</button>
                
              </div>
              <div v-else>
                <input v-model="editedIngredient" @input="updateIngredient" @blur="stopEditingIngredient" />
                <button @click="confirmEditIngredient(i)">Confirm</button>
              </div>
              <button @click="deleteIngredient(i)">Delete</button>
            </div>
            <!-- {{ recipeDetails.ingredientsArray }} -->
          </div>

          <div class="form-group">
            <label for="recipeInstructions">Steps:</label><br>
            <div v-for="(instruction, j) in recipeDetails.instructionsArray" :key="j">
              <div v-if="editingInstructionIndex !== j">
                <span>{{ instruction }}</span>
                <button @click="startEditingInstruction(j)">Edit</button>
                
              </div>
              <div v-else>
                <input v-model="editedInstruction" @input="updateInstruction" @blur="stopEditingInstruction" />
                <button @click="confirmEditInstruction(j)">Confirm</button>
              </div>
              <button @click="deleteInstruction(j)">Delete</button>
            </div>
          </div>
        <!-- Redirect to ? -->
        <button type="button" @click="showLogs()">Save Changes</button>
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

  data() {
    return {
      // hardcoded for easier testing (setting up page-page link)
      // recipeDetails represent sample recipe data sent from GenerateRecipe.vue when user presses 'edit'

      recipeDetails:
      {
        "recipeName": " Tamagoyaki (Japanese Rolled Omelette)\n\n",
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-D12V1pcCP5fIMJP2UaFzZwOD/user-FpsBNmRJpxtxaxY6LCQSuzQd/img-4TMg5G5DHuZdILvKa48yhTl3.png?st=2023-11-08T05%3A17%3A42Z&se=2023-11-08T07%3A17%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-08T04%3A38%3A07Z&ske=2023-11-09T04%3A38%3A07Z&sks=b&skv=2021-08-06&sig=H4OQzDjKrjORt/uo9AJkIlzsax2HtGKYJ8Vc4qh3ILU%3D",
          "ingredientsArray": [
            "- 4 large eggs",
            "1 tablespoon soy sauce",
            "1 tablespoon mirin (Japanese sweet rice wine)",
            "1 teaspoon granulated sugar",
            "1/4 teaspoon salt",
            "1 tablespoon vegetable oil, for cooking"
          ],
            "instructionsArray": [
              "1. Crack the eggs into a bowl and whisk them well until the yolks and whites are fully mixed.",
              "2. Add soy sauce, mirin, sugar, and salt to the egg mixture. Whisk everything together until the sugar is dissolved.",
              "3. Heat a non-stick frying pan over medium heat and add vegetable oil, making sure to distribute it evenly across the pan's surface.",
              "4. Pour a small amount of the egg mixture to thinly cover the bottom of the pan, tilting the pan to spread it out evenly.",
              "5. Once the bottom layer of egg has set but is still slightly runny on top, start rolling it from one end of the pan to the other using a spatula or chopsticks.",
              "6. Push the rolled layer of egg to one end of the pan and then pour another thin layer of the egg mixture to cover the empty side of the pan again. Lift up the rolled layer slightly to let the new mixture flow underneath it.",
              "7. When the new layer has set but is still slightly runny on top, roll it up towards the other end of the pan again.",
              "8. Repeat steps 6 and 7 until all the egg mixture is used and you have a log-shaped rolled omelette. Make sure to gently lift the already rolled layers to let the new mixture flow underneath each time.",
              "9. Remove the rolled omelette from the pan and let it cool for a few minutes before cutting it into slices.",
              "10. Serve Tamagoyaki slices on a plate and enjoy!",
              "Note: Tamagoyaki can be served as a side dish, part of a bento box, or as a topping for sushi. It can also be enjoyed on its own or served with a side of steamed rice."
            ]
      },
      isChosen: true,

      editingIngredientIndex: -1, // Track the index being edited
      editingInstructionIndex: -1,

      editedName: '',
      editedIngredient: "",
      editedInstruction:'',

    }
  },
  // created() {
  //   // Access the recipeDetails from the route query
  //   this.recipeDetails = this.$route.query.recipeDetails;
  // },

    props: {

    },
    computed: {
        
    },
  methods: {
      updateRecipeName() {
        this.recipeDetails.recipeName = this.editedName;
      },
      toggleImageSelection() {
        this.isChosen = !this.isChosen;
      },
      startEditingIngredient(index) {
        this.editingIngredientIndex = index; // Enable editing for the clicked item
        this.editedIngredient = this.recipeDetails.ingredientsArray[index];
      },
      stopEditingIngredient() {
        this.editingIngredientIndex = -1; // Disable editing
        this.editedIngredient = "";
      },
      confirmEditIngredient(index) {
        this.recipeDetails.ingredientsArray[index] = this.editedIngredient; // Update the ingredient
        this.stopEditingIngredient(); // Disable editing

        console.log(this.recipeDetails.ingredientsArray);
      },
      updateIngredient() {
        if (this.editingIngredientIndex !== -1) {
          // Update the ingredient in the array when input changes
          this.recipeDetails.ingredientsArray[this.editingIngredientIndex] = this.editedIngredient;
        }
      },

      startEditingInstruction(index) {
        this.editingInstructionIndex = index; // Enable editing for the clicked item
        this.editedInstruction = this.recipeDetails.instructionsArray[index];
      },
      stopEditingInstruction() {
        this.editingInstructionIndex = -1; // Disable editing
        this.editedInstruction = "";
      },
      confirmEditInstruction(index) {
        this.recipeDetails.instructionsArray[index] = this.editedInstruction; // Update the instruction
        this.stopEditingInstruction(); // Disable editing

        console.log(this.recipeDetails.instructionsArray);
      },
      updateInstruction() {
        if (this.editingInstructionIndex !== -1) {
          // Update the ingredient in the array when input changes
          this.recipeDetails.instructionsArray[this.editingInstructionIndex] = this.editedInstruction;
        }
      },

      // for debugging (check if data changed in console)
      showLogs() {
        console.log("Recipe Details", this.recipeDetails);
      },

    }
  };
</script>
  