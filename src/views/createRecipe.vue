<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Create Recipe</h1>

        <div class="table">
          <!-- Easiest to hardest input -->

            <div class="row">
                <label for="recipeName" class="form-label">Recipe Name:</label>
                <input type="text" id="recipeName" v-model="recipeName" class="form-control" :title="isEmpty ? 'Recipe Name is required' : ''"
                @focus="isEmpty = false" 
                @blur="isEmpty = recipeName.trim() === ''"
                :class="{'is-invalid': !recipeName}">
                <div v-if="!recipeName" class="text-danger">Recipe Name is required!</div>
              
            </div>

            <div class="row">
              
                <label for="creator" class="form-label">Creator:</label>
                <input type="text" id="creator" v-model="creator" class="form-control" disabled v-if="user" >
                <input type="text" id="creator" v-model="creator" class="form-control" v-else>

            </div>

            <div class="row">
              
                <label for="mealType" class="form-label">Meal Type:</label>
                <select id="mealType" v-model="mealType" class="form-select" :class="{'is-invalid': !mealType}">
                  <option value="Breakfast">Breakfast</option>
                  <option value="Brunch">Brunch</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Supper">Supper</option>
                </select>
                <div v-if="!mealType" class="text-danger">Choose one meal type!</div>
            </div>
              
            <div class="row">
              
                <label for="cuisineType" class="form-label">Cuisine Type:</label>
                <select id="cuisineType" v-model="cuisineType" class="form-select" :class="{'is-invalid': !cuisineType}">
                  <option value="Chinese">Chinese</option>
                  <option value="Western">Western</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                </select>
                <div v-if="!mealType" class="text-danger">Choose one cuisine type!</div>

            </div>

            <div class="row">
              
                <label for="description" class="form-label">Description:</label>
                <textarea id="description" v-model="description" class="form-control"></textarea>
                <p class="text-muted text-counter">{{ remainingChar }}</p>
            </div>
            
            <div class="row">
                
                <label for="imageUpload" class="form-label">Recipe Image:</label>
                <input type="file" id="imageUpload" @change="onImageSelected" class="form-control" :class="{ 'border-danger': !fileUploaded }" required accept="image/*" ref="fileInput">
              
            </div>

        </div>
        

        
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
                <!-- Ingredient Quantity (change input type to "number" and add min attribute) -->
                <div class="form-group">
                  <label for="ingredientQuantity" class="form-label">Ingredient Quantity:</label>
                  <input type="number" v-model="ingredient.quantity" class="form-control"  min="1">
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
      
        <!-- Loading SPinner -->
        <div class="loading-row mx-auto">
          <div class="loading-content" v-if="loading">
            <div class="loader"></div>
          </div>
        </div>

      <!-- Create Recipe Button -->
      <button type="button" @click="uploadImageAndCreateRecipe" class="btn mt-4 create_btn" :disabled="loading">Create Recipe</button>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getFirestore, collection, addDoc, getDoc, setDoc, updateDoc, doc } from 'firebase/firestore';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication methods
  import { useRouter } from 'vue-router' // import router
  const storage = getStorage();
  const imageUploadProgress = ref(0);
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter() // get a reference to our vue router

  export default {
    setup(){
        const router = useRouter();
        return {
        router, // make router available to the template and other options
        };
    },
  data() {
    return {
      creator: '',
      user: null,
      recipeName: '',
      mealType: '',
      cuisineType: '',
      description: '',
      ingredients: [{ name: '', quantity: 1 }],
      steps: [{ description: '' }],
      selectedImage: null,
      imageUploadProgress: 0,
      recipeImageURLs: [],
      fileUploaded: false,

      loading: false,
    };
  },
  computed:{
    remainingChar(){
      return 256 - this.description.length;
    },

  },
  methods: {
    addIngredient: function (){
      this.ingredients.push({ name: '', quantity: '' });
    },
    removeIngredient: function(index){
      this.ingredients.splice(index, 1);
    },
    addStep: function(){
      this.steps.push({ description: '' });
    },
    removeStep: function(index){
      this.steps.splice(index, 1);
    },
    onImageSelected(event) {
      this.selectedImage = event.target.files[0]; 
      this.fileUploaded = true;
    },
    uploadImageAndCreateRecipe: async function () {

      if (!this.recipeName || !this.mealType || !this.cuisineType) {
        alert('Please fill in all required fields!');
        return;
      }

        if (this.selectedImage) {

          console.log("Loading spinner");
          this.loading = true;

      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      const uniqueID = `${timestamp}_${randomString}`;

      const fileName = `${uniqueID}`;
      const storageReference = storageRef(storage, `recipeImages/${fileName}`);

      const snapshot = await uploadBytes(storageReference, this.selectedImage);
      imageUploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      try {
        const downloadURL = await getDownloadURL(storageReference);

        const user = auth.currentUser;
        const userUID = user ? user.uid : null;

        this.recipeImageURLs.push(downloadURL);

        const recipesRef = collection(db, 'recipes');
        const recipeData = {
          name: this.recipeName,
          creator: this.creator,
          mealType: this.mealType,
          cuisineType: this.cuisineType,
          description: this.description,
          ingredients: this.ingredients,
          steps: this.steps,
          recipeImageURLs: this.recipeImageURLs,
          imageId: uniqueID,
          uid: userUID,
          likes: 0,
          reviews: []
        };

        const docRef = await addDoc(recipesRef, recipeData);
        const autoGeneratedID = docRef.id;

        recipeData.autoGeneratedID = autoGeneratedID;

        await updateDoc(doc(db, 'recipes', autoGeneratedID), recipeData);

      if (userUID) {
        const userRef = doc(db, 'Users', userUID);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        if (userData && Array.isArray(userData.posts)) {
          userData.posts.push(autoGeneratedID);
          await updateDoc(userRef, userData);
        }
      }

        this.recipeName = '';
        this.creator = '';
        this.mealType = '';
        this.cuisineType = '';
        this.description = '';
        this.ingredients = [{ name: '', quantity: '' }];
        this.steps = [{ description: '' }];
        this.recipeImageURLs = [];
        imageUploadProgress.value = 0;

        this.loading = false; // Reset loading state on success
        this.router.push('/explore');
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    } else {
          this.loading = false; // Reset loading state if no image selected
    }
    }

    },
    created() {
      const db = getFirestore();
      const auth = getAuth();
      const storage = getStorage();
      onAuthStateChanged(auth, async (user) => { // Make this function async
        if (user) {
          // User is signed in, set the user data
          if(auth.currentUser != null){
            this.user = auth.currentUser;
            var uid = user.uid;

            var usersCollection = collection(db, "Users");
            const docRef = doc(usersCollection, uid); // Use uid instead of "userID"
            const docSnap = await getDoc(docRef); // Use await here
    
            if (docSnap.exists) { // Correct usage
              this.creator = docSnap.data().username;
            } else {
              console.log("")
            }
          }
          else{
            console.log("");
          }
        } else {
          // User is signed out
          this.user = null;
          console.log("");
        }
      });
    }
}
  </script>
  
  <style>
  .border-danger {
    border-color: red !important;
    }
    .create_btn{
      background-color: #25d366;
      font-weight: bold;
    }
    .create_btn:hover{
      background-color: #00ad40;
      color:white;
      box-shadow: 0 0 0 0 rgba(8, 136, 8, 0.7);
      -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      background-color: #24a152;
    }
    /* Card styles */
    .card {
      max-width: 2200px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: 110px;
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

    .is-invalid{
      border-color: #D9534F;
    }
    .form-control,
    .form-select{
      margin-bottom: 5px;
    }
    .text-counter{
      text-align: right;
    }

    /* Ingredient and Step items styles */
    .ingredient-item,
    .step-item {
      border: 1px solid #ffffff;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #e0f0e1; /* Background color */
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
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .btn-primary {
      background-color: #0056b3;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  

   /* loading spinner */
  .loading-row,
  .loading-content{
    height: 100%;
  }

  .loading-content{
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .loader  {
    animation: rotate 1s infinite;  
    height: 50px;
    width: 50px;
  }

  .loader:before,
  .loader:after {   
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;  
    width: 20px;
  }
  .loader:before {
    animation: ball1 1s infinite;  
    background-color: #cb2025;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
  .loader:after {
    animation: ball2 1s infinite; 
    background-color: #00a096;
    box-shadow: 30px 0 0 #97bf0d;
  }
    /* Additional Styles */
    /* Adjust styles as needed for your specific design */
    .row {
      margin-bottom: 20px;
    }


  @keyframes rotate {
    0% { 
      -webkit-transform: rotate(0deg) scale(0.8); 
      -moz-transform: rotate(0deg) scale(0.8);
    }
    50% { 
      -webkit-transform: rotate(360deg) scale(1.2); 
      -moz-transform: rotate(360deg) scale(1.2);
    }
    100% { 
      -webkit-transform: rotate(720deg) scale(0.8); 
      -moz-transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #f8b334;
    }
    50% {
      box-shadow: 0 0 0 #f8b334;
      margin-bottom: 0;
      -webkit-transform: translate(15px,15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #f8b334;
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 #97bf0d;
    }
    50% {
      box-shadow: 0 0 0 #97bf0d;
      margin-top: -20px;
      -webkit-transform: translate(15px,15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #97bf0d;
      margin-top: 0;
    }
  }
  </style>
  