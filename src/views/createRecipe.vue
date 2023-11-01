<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Create Recipe</h1>

        <div class="row">
          <!-- Column for Photo Upload -->

              <div class="form-group mt-4">
                <label for="imageUpload" class="form-label">Recipe Image:</label>
                <input type="file" id="imageUpload" @change="onImageSelected" class="form-control">
              </div>

            <!-- Column for Recipe Details -->

              <div class="form-group mt-4">
                <label for="recipeName" class="form-label">Recipe Name:</label>
                <input type="text" id="recipeName" v-model="recipeName" class="form-control">
              </div>
              <div class="form-group">
                <label for="creator" class="form-label">Creator:</label>
                <input type="text" id="creator" v-model="creator" class="form-control">
              </div>
              <div class="form-group">
                <label for="mealType" class="form-label">Meal Type:</label>
                <select id="mealType" v-model="mealType" class="form-select">
                  <option value="Breakfast">Breakfast</option>
                  <option value="Brunch">Brunch</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Supper">Supper</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cuisineType" class="form-label">Cuisine Type:</label>
                <select id="cuisineType" v-model="cuisineType" class="form-select">
                  <option value="Chinese">Chinese</option>
                  <option value="Western">Western</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                </select>
              </div>
              <div class="form-group">
                <label for="description" class="form-label">Description:</label>
                <textarea id="description" v-model="description" class="form-control"></textarea>
              </div>
            </div>

          
          <!-- Ingredients Form -->
          <div class="form-group mt-4">
            <h3>Ingredients</h3>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-item">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="ingredientName" class="form-label">Ingredient Name:</label>
                    <input type="text" v-model="ingredient.name" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="ingredientQuantity" class="form-label">Ingredient Quantity:</label>
                    <input type="text" v-model="ingredient.quantity" class="form-control">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button type="button" @click="removeIngredient(index)" class="btn btn-danger mt-3">Remove Ingredient</button>
                </div>
              </div>
            </div>
            <button type="button" @click="addIngredient" class="btn btn-primary mt-3">Add Ingredient</button>
          </div>

          <!-- Steps Form -->
          <div class="form-group mt-4">
            <h3>Steps</h3>
            <div v-for="(step, index) in steps" :key="index" class="step-item">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="stepDescription" class="form-label">Step Description:</label>
                    <textarea v-model="step.description" class="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button type="button" @click="removeStep(index)" class="btn btn-danger mt-3">Remove Step</button>
                </div>
              </div>
            </div>
            <button type="button" @click="addStep" class="btn btn-primary mt-3">Add Step</button>
          </div>

        <!-- Create Recipe Button -->
        <button type="button" @click="uploadImageAndCreateRecipe" class="btn btn-success mt-4">Create Recipe</button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication methods

const auth = getAuth(); // Initialize Firebase Authentication
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

    const fileName = `${uniqueID}`;
    const storageReference = storageRef(storage, `recipeImages/${fileName}`);

    const snapshot = await uploadBytes(storageReference, selectedImage.value);
    imageUploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    try {
      const downloadURL = await getDownloadURL(storageReference);

      const user = auth.currentUser;
      const userUID = user ? user.uid : null;

      recipeImageURLs.value.push(downloadURL);

      const recipesRef = collection(db, 'recipes');
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
        uid: userUID,
        likes: 0 /* Addded likes in here to pre-load 0 likes for all new recipes */
      };

      const docRef = await addDoc(recipesRef, recipeData);
      const autoGeneratedID = docRef.id;

      recipeData.autoGeneratedID = autoGeneratedID;

      await updateDoc(doc(db, 'recipes', autoGeneratedID), recipeData);

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

<style>
  /* Card styles */
  .card {
    max-width: 2200px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  /* Form styles */
  .form-label {
    font-weight: bold;
    color: #333; /* Text color */
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #333; /* Text color */
  }

  /* Ingredient and Step items styles */
  .ingredient-item,
  .step-item {
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #f9f9f9; /* Background color */
  }

  /* Button styles */
  .btn-success {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-danger {
    background-color: #D9534F;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary {
    background-color: #337ab7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Additional Styles */
  /* Adjust styles as needed for your specific design */
  .row {
    margin-bottom: 20px;
  }
</style>
