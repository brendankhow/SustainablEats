<template>
  <h1>Create Recipe</h1>
            <div id="app" class="container mt-5">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">Photos</h2>
                  <div class="form-group">
                    <label for="imageUpload">Recipe Image:</label>
                <input type="file" id="imageUpload" @change="onImageSelected" class="form-control">
              </div>
                </div>
              </div>
            </div>

              <!-- <div class="form-group">
                <progress v-if="imageUploadProgress > 0" :value="imageUploadProgress" max="100"></progress>
              </div> -->
              <!-- <button type="button" @click="uploadImage" class="btn btn-primary">Upload Image</button> -->
          
            <div id="app" class="container mt-5">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">Details</h2>
                  <form>
                    <!-- Recipe information fields -->
                    <div class="form-group">
                      <label for="recipeName">Recipe Name:</label>
                      <input type="text" id="recipeName" v-model="recipeName" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="creator">Creator:</label>
                      <input type="text" id="creator" v-model="creator" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="mealType">Meal Type:</label>
                      <input type="text" id="mealType" v-model="mealType" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="cuisineType">Cuisine Type:</label>
                      <input type="text" id="cuisineType" v-model="cuisineType" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="description">Description:</label>
                      <textarea id="description" v-model="description" class="form-control"></textarea>
                    </div>
            
                    <hr>
            
                    <!-- Ingredients form -->
                    <div class="ingredient-form">
                      <h3>Ingredients</h3>
                      <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-item">
                        <div class="form-group">
                          <label for="ingredientName">Ingredient Name:</label>
                          <input type="text" v-model="ingredient.name" class="form-control">
                        </div>
                        <div class="form-group">
                          <label for="ingredientQuantity">Ingredient Quantity:</label>
                          <input type="text" v-model="ingredient.quantity" class="form-control">
                        </div>
                        <button type="button" @click="removeIngredient(index)" class="btn btn-danger">Remove Ingredient</button>
                      </div>
                      <button type="button" @click="addIngredient" class="btn btn-primary">Add Ingredient</button>
                    </div>
            
                    <hr>
            
                    <!-- Steps form -->
                    <div class="steps-form">
                      <h3>Steps</h3>
                      <div v-for="(step, index) in steps" :key="index" class="step-item">
                        <div class="form-group">
                          <label for="stepDescription">Step Description:</label>
                          <textarea v-model="step.description" class="form-control"></textarea>
                        </div>
                        <button type="button" @click="removeStep(index)" class="btn btn-danger">Remove Step</button>
                      </div>
                      <button type="button" @click="addStep" class="btn btn-primary">Add Step</button>
                    </div>
            
                    <hr>
            
                    <button type="button" @click="uploadImageAndCreateRecipe" class="btn btn-success">Create Recipe!</button>
                  </form>
                </div>
              </div>
            </div>

</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const recipeName = ref('');
const creator = ref('');
const mealType = ref('');
const cuisineType = ref('');
const description = ref('');
const ingredients = ref([{ name: '', quantity: '' }]);
const steps = ref([{ description: '' }]);
const selectedImage = ref(null);
const imageUploadProgress = ref(0);
const recipeImageURLs = ref([]);
const db = getFirestore();
const storage = getStorage();

const addIngredient = () => {
  ingredients.value.push({ name: '', quantity: '' });
};

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
};

const addStep = () => {
  steps.value.push({ description: '' });
};

const removeStep = (index) => {
  steps.value.splice(index, 1);
};

const onImageSelected = (event) => {
  selectedImage.value = event.target.files[0];
};

const uploadImageAndCreateRecipe = async () => {
  if (selectedImage.value) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueID = `${timestamp}_${randomString}`;

    const fileName = `${recipeName.value}_${creator.value}_${uniqueID}`;
    const storageReference = storageRef(storage, `recipeImages/${fileName}`);

    const snapshot = await uploadBytes(storageReference, selectedImage.value);
    imageUploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    const downloadURL = await getDownloadURL(storageReference);
    recipeImageURLs.value.push(downloadURL);
    
    const recipesRef = collection(db, 'recipes');
    
    try {
      const recipeData = {
        name: recipeName.value,
        creator: creator.value,
        mealType: mealType.value,
        cuisineType: cuisineType.value,
        description: description.value,
        ingredients: ingredients.value,
        steps: steps.value,
        recipeImageURLs: recipeImageURLs.value,
        imageId: uniqueID,
        // recipeId: autoGeneratedID,
        autoGeneratedID: null, // Placeholder for the auto-generated ID

      };

      // Add the recipe document to Firestore and get the auto-generated Document ID
      const docRef = await addDoc(recipesRef, recipeData);

      // Access the auto-generated Document ID
      const autoGeneratedID = docRef.id;

      // Update the recipeData with the auto-generated ID
      recipeData.autoGeneratedID = autoGeneratedID;

      // Update the Firestore document with the updated recipeData using updateDoc
      await updateDoc(doc(db, 'recipes', autoGeneratedID), recipeData);

      // Now, you can use autoGeneratedID as needed in your application.

      // Reset form fields and progress
      recipeName.value = '';
      creator.value = '';
      mealType.value = '';
      cuisineType.value = '';
      description.value = '';
      ingredients.value = [{ name: '', quantity: '' }];
      steps.value = [{ description: '' }];
      recipeImageURLs.value = [];
      imageUploadProgress.value = 0;
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  }
};
</script>