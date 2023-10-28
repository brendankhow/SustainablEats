<template>
  <h1>what nonsense is this</h1>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
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
        recipeID: uniqueID,
      };

      await addDoc(recipesRef, recipeData);

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