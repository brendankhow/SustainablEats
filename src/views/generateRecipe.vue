<template>
  <div class="container" style="margin-top: 140px">
    <div class="row mt-3 header">
        <div class="col d-flex align-items-start">
            <img src="../assets/angle-left.png" class="d-inline-block d-flex" onclick="history.back()" width="50">
            <h1 class="d-inline-block"><b>Generate New Recipe</b></h1>
        </div>
        <hr style="border:3px solid #25d366;">
    </div>
      <!-- ================================USER DETAILS===================================================================================-->
      <div class="row">
          <div class="container-fluid">
              <div class="row mb-3 mt-2 ms-1">
                  <label for="creator" class="col-lg-2 col-md-12 col-form-label fw-bold">Create Recipe</label>
                  <div class="col-lg-10 col-md-12 col-sm-12">
                    <input type="text" id="creator" v-model="creator" class="form-control border-0" disabled v-if="user" >
                    <input type="text" id="creator" v-model="creator" class="form-control border-0"  v-else>
                  </div>
              </div>

              <div class="row mb-3 ms-1">
                  <label for="cusineType" class="col-lg-2 col-md-12 col-form-label fw-bold">Cuisine:</label>
                  <div class="col-lg-10 col-md-12 col-sm-12">
                    <select id="cuisineType" class="form-control border-0" style="background-color:#EDF8FF;" v-model="cuisineType" :class="{'is-invalid': !cuisineType}">
                      <option value="Chinese">Chinese</option>
                      <option value="Western">Western</option>
                      <option value="Italian">Italian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                    </select>
                  </div>
              </div>

              <div v-if="!cuisineType" class="row mb-3 ms-1 text-danger text-center">Choose one cuisine type!</div>

              <div class="row mb-3 ms-1">
                <label for="username" class="col-lg-2 col-md-12 col-form-label fw-bold">Dietary Restriction:</label>
                <div class="col-lg-10 col-md-12">
                  <textarea id="dietaryRestrictions" class="form-control border-0" style="background-color:#EDF8FF;" v-model="dietaryRestrictions"></textarea>
                  <div class="text-secondary text-center info-text">comma-separated (leave blank if have non)</div>
                </div>
              </div>
              <div class="row mb-3 ms-1">
                <label for="prioritizedIngredients" class="col-lg-2 col-md-12 col-form-label fw-bold">Ingredients:</label>
                <div class="col-lg-10 col-md-12">
                  <textarea id="prioritizedIngredients" class="form-control border-0" style="background-color:#EDF8FF;" @input="checking_ingredients" v-model="prioritizedIngredients"></textarea>
                  <div class="text-secondary info-text">comma-separated (leave blank if have non)</div>
                  <div class="text-danger text-center" v-if="!checkingredients" >Do Not Leave This Blank</div>
                </div>
              </div>
              <div class="col-md-12 submit-btn-div">
                <button class="gen-form-submit-btn w-100 m-0 mx-auto px-5 mb-5" role="button" @click="fetchRecipe();fetchImg()">
                  <span class="info-labels">Generate</span>
                </button>
            </div>
          </div>
          <hr style="border:3px solid #25d366;">
      </div>
      <div class="row mx-auto">
        <div class="spinner-border mx-auto text-center d-flex justify-content-center align-content-center" v-if="loading"></div>
      </div>
      <!-- Output Interface (Initially Hidden) style="display: none;"-->
      <div class="gen-out box py-5 mx-0 container" v-if="inputSubmitted && !loading"> 
        <div class="gen-out-header row">
            <h1 class="recipe-title text-center" v-if="recipe.recipeName"><strong>{{ recipe.recipeName }}</strong></h1>
            <div class="ai-img">
              <div class="d-flex justify-content-center align-items-center">
                <img id="ai-img" v-if="recipe.image" :src="recipe.image" alt="Recipe Image"/>
              </div>
            <div>
          </div>
        </div>
        <div class="row">
          <p class="text-center">Like this image? Download it here: </p>
        </div>

        <div class="row">
          <a class="text-center" v-if="recipe.image" :href="recipe.image" target="_blank">
            <button class="download-img-btn text-center">Download Image</button>
          </a>
        </div>
            <!-- <p class="recipe-desc">{{ recipe.description }}</p> -->
      </div>
        
      <div class="row recipe-box mx-2">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3" style="border-bottom:4px solid #25d366; border-top: 4px solid #35d366">
            <h3 class="text-center d-flex">Ingredients</h3>
          </div>
        
          <div class="col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3" id="instructions" style="border-bottom:4px solid #c8f4d8; border-top: 4px solid #c8f4d8">
            <h3 class="text-center">Steps</h3>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3" style="border-bottom:4px solid #25d366">
            <ul class="ingredient-list left-aligned">
              <li v-for="(ingredient, index) in recipe.ingredientsArray" :key="index">
                <span v-if="index === 0">{{ ingredient.replace('- ', '') }}</span>
                <span v-else>{{ ingredient }}</span>
              </li>
            </ul>
          </div>

          <div class="col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center p-3" style="border-bottom:4px solid #c8f4d8">
            <ol class="instruction-list left-aligned">
              <li v-for="instruction in recipe.instructionsArray">{{ instruction.split('. ').slice(1).join('. ') }}
                <span v-if="instruction === ''"></span>
              </li>
            </ol>
          </div>
        </div>
        <!-- DISCLAIMER -->
        <div class="text-center p-0 my-0 mx-0">
          <div class="disclaimer-divider"></div>
              <strong>DISCLAIMER: This recipe is AI-generated and has not verified it for accuracy or safety.</strong>
          <div class="disclaimer-divider"></div>
      </div>
    </div>

    <div class="row">
      <p class="text-center">Like what you see? Download the image here and upload it with the recipe!</p>
    </div>

    <div class="row-lg-12 row-md-12 row-sm-12 mb-2">
      <div class="col d-flex justify-content-center" v-if="selectedImage">
          <img id="user_pic" :src="selectedImage" class="rounded-circle" style="border: 5px solid #25d366" width="150" height="150">
      </div>

      <div class="col d-flex align-items-center mt-3" >
        <input class="row form-control" type="file" id="userimage" @change="previewImage" accept="image/*">
        <br><br>
      </div>
      <div class="row">
        <button type="button" @click="uploadImageAndCreateRecipe" class="row text-center upload_btn">Upload Recipe</button>
      </div>
    </div>              
  </div>  
</div>
          
    <!-- Guide -->
<div class="mt-0 pt-5 pb-5 b-10 mx-auto container-fluid" style="background-color:#e0f0e1">
  <div class="mt-0 pb-3 px-2 px-md-5 container" style="background-color:white; border-radius: 20px">
    <!-- Header -->
    <div class="py-5 d-flex align-items-center row">
        <div class="col-md-3">
            <div class="py-3 container">
                <div class="guide-divider"></div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="text-center container">
                <h1 class="guide-heading">Recipe Generation Guide</h1>
            </div>
        </div>
        <div class="col-md-3">
            <div class="py-3 container">
                <div class="guide-divider"></div>
            </div>
        </div>
    </div>
    <div class="mx-auto">
      <!-- Content -->
      <!-- Insert more here -->
      <div class="mx-auto" style="">
        <p>
          <strong>Include your cuisine of choice.</strong>
          Select the cuisines you want to include in your recipe. You can choose from a variety of options, such as Italian, Indian,
          American, Mediterranean, Chinese, etc.
          <br><br>
          <strong>Prioritize certain ingredients to be used.</strong>
          Chicken breast, lentils, or avocado for example. Remember to separate each item with a comma(',')
          <br><br>
          <strong>ALLERGIES</strong>
          If you have any food allergies or dietary restrictions (like gluten), make sure to mention them.
        </p>
      </div>
    </div>
  </div>
</div>
          
</template>

<script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  import { useRouter } from "vue-router";
  import axios from 'axios';
</script>

<script>
import { useRouter } from "vue-router";
import axios from 'axios';
import { ref } from 'vue';
import { getFirestore, collection, addDoc, getDoc, setDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication methods

const storage = getStorage();
const imageUploadProgress = ref(0);
const auth = getAuth();
const db = getFirestore();
const router = useRouter() // get a reference to our vue router

  export default {
    setup(){
        const router = useRouter();
        return {router,}; // make router available to the template and other options
    },

    data() {
      return {
        //no naughty take cheryl api key ok: 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
        OPENAI_API_KEY: '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', // will key

        // for database
        creator: '',
        user: null,
        recipeName: '',
        mealType: '',

        description: '',
        ingredients: [],
        steps: [],
        selectedImage: "https://firebasestorage.googleapis.com/v0/b/sustainableats-11dde.appspot.com/o/recipeImages%2Fdefault.png?alt=media&token=d5472109-56cc-4451-b15b-3316dbdeadc6",
        imageUploadProgress: 0,
        recipeImageURLs: [],

        // user inputs
        cuisineType:'',
        dietaryRestrictions:'',
        prioritizedIngredients:'',
        checkingredients: false,
        inputSubmitted: false,
        loading: false,
        imageid: '',

        recipe: {
          recipeName: '',
          image: 'default.png',
          description: '',
          ingredientsArray: [],
          instructionsArray: [],
        },
      };
    },

    computed: {
      userInput() {
        if(this.dietaryRestrictions != ""){
          this.dietaryRestrictions = `I am allergic to ${this.dietaryRestrictions}`;
        }
        else{
          this.dietaryRestrictions = "I have no dietary restrictions";
        }
        return `I want a ${this.cuisineType} type recipe. ${this.dietaryRestrictions} and prioritize using the following ingredients: ${this.prioritizedIngredients}. Always include a Recipe Name: recipe name \n.`
      },
    },

    methods: {      
      async checking_ingredients(){
        if (this.prioritizedIngredients.length > 0) {
            this.checkingredients = true;
        }
        else{
          this.checkingredients = false;
        }

        return;
      },
      async fetchRecipe() {
        if(this.checkingredients == false || !this.cuisineType || this.cuisineType.trim() === ''){
          alert("Enter something please");
          return;
        }
        this.loading = true;
        
        axios.post('https://api.openai.com/v1/chat/completions', 
        { 
          'model': 'gpt-3.5-turbo',
          'messages': 
          [
            {
                'role': 'system',
                'content': 'You are a helpful assistant.'
            },
            {
                'role': 'user',
                'content': this.userInput,
            }
          ]
        },
        { 
          headers: 
            { 
              'Authorization': `Bearer ${this.OPENAI_API_KEY}`, 
              'Content-Type': 'application/json' 
            } 
        }
        )
        .then(response => {
            this.loading = false;
            const recipeData = response.data.choices[0].message.content.split('Ingredients:\n');
            console.log('Recipe Data:', recipeData)
          // Extract the recipe title
          // console.log('unproc_title:', recipeData[0].split('\n\n'));
          // const recipeTitle = recipeData[0].split('\n\n')[1];
          // console.log('Title:', recipeTitle);

          if (recipeData.length > 1) {
            const ingredientsPart = recipeData[1];
            const [ingredients, instructions] = ingredientsPart.split('Instructions:\n');
            
            // Format ingredients and instructions as arrays
            const ingredientsArray = ingredients.split('\n- ').map(item => item.trim());
            const instructionsArray = instructions.split('\n').filter(item => item.trim() !== '');
            const recipeName = recipeData[0].split('Recipe Name:')[1];
            // IMPORTANT *****************************************
            // this.recipe.title = this.userInput;
            this.recipe.recipeName = recipeName;
            console.log(recipeName);

            this.fetchImg(recipeName);
            this.recipe.description = recipeData[0];
            this.recipe.ingredientsArray = ingredientsArray;
            this.recipe.instructionsArray = instructionsArray;
            this.inputSubmitted = true;
            this.loading = false;
          } else {
            console.log("");
          }

        })
        .catch(error => {
          console.log("");
        });
      },
      // fetch image
      async fetchImg(recipeName) {
        if(recipeName == ""){
          this.recipeName = this.prioritizedIngredients;
        }
        else{
          try{
          const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: 'generate a nice aesthetic and professional looking image for the recipe: ' + recipeName,
                n: 1,
                size: '1024x1024',
            },
            {
                headers: {
                'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
                // image
                'Content-Type':'application/json'
                },
            }
            );
            this.recipe.image = response.data.data[0].url;
          }
          catch{
            console.log("");
          }
        }
      },
      async previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    // upload to Firebase Storage
                    
                    const timestamp = new Date().getTime();
                    const randomString = Math.random().toString(36).substring(2, 8);
                    const uniqueID = `${timestamp}_${randomString}`;
                    const fileName = `img-${uniqueID}`;
                    const storageRef = firebaseRef(storage, 'recipeImages/' + fileName);
                    await uploadBytes(storageRef, file);
                    
                    // get download URL
                    const url = await getDownloadURL(storageRef);
                    console.log(url);
                    this.selectedImage = url;
                    console.log(uniqueID);
                    this.imageid = fileName;
                    this.recipe.image = fileName;
                };
                reader.readAsDataURL(file);
            }
        },
        
      async uploadImageAndCreateRecipe() {
        try{
          if (this.selectedImage) {
            //checking if it is current user
            const user = auth.currentUser;
            const userUID = user ? user.uid : null;

            //setting filename to be unique + uploading the photo into storage
            const formattedIngredients = this.recipe.ingredientsArray.map((ingredient) => {
            // Use a regular expression to capture the quantity and the rest of the text as name
              const match = ingredient.match(/^(-?\s*\d.*?)(?=\s*-|$)/);

              if (match) {
                // Extract the matched quantity and name
                const quantity = match[1].trim();
                const name = ingredient.replace(match[0], '').trim();

                return { name, quantity };
              } else {
                // If no quantity is found, consider the entire ingredient as the name
                return { name: ingredient.trim(), quantity: '' };
              }
            });

            // // steps
            const formattedInstructions = this.recipe.instructionsArray.map(instruction => {
              const parts = instruction.split(' ');
              const description = parts.slice(1).join(' ');
              return { description };
            });

            //getting the data ready
            const recipeData = {
              name: this.recipe.recipeName,
              mealType: "Breakfast",
              creator: this.creator,
              cuisineType: this.cuisineType,
              ingredients: formattedIngredients,
              steps: formattedInstructions,
              recipeImageURLs: [this.selectedImage],
              imageId: this.recipe.image,
              uid: userUID,
              likes: 0,
              reviews: []
            };
            console.log(recipeData.uniqueID);

            //sending data into firebase
            const recipesRef = collection(db, 'recipes');
            const docRef = await addDoc(recipesRef, recipeData);
            const autoGeneratedID = docRef.id;

            recipeData.autoGeneratedID = autoGeneratedID;

            await updateDoc(doc(db, 'recipes', autoGeneratedID), recipeData);

            //adding the post id into the user db to link it together
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
            this.ingredients = [];
            this.steps = [{ description: '' }];
            this.recipeImageURLs = [];
            imageUploadProgress.value = 0;
          }
        }catch(error){
          console.log()
        }
        this.$router.push('/explore');
      }
      
    
  },
  created() {
    const db = getFirestore();
    const auth = getAuth();
    const storage = getStorage();
    onAuthStateChanged(auth, async (user) => { // Make this function async
      if (user) {
        // User is signed in, set the user data
        if (auth.currentUser != null) {
          this.user = auth.currentUser;
          var uid = user.uid;

          var usersCollection = collection(db, "Users");
          const docRef = doc(usersCollection, uid); // Use uid instead of "userID"
          const docSnap = await getDoc(docRef); // Use await here

          if (docSnap.exists) { // Correct usage
            this.creator = docSnap.data().username;
          } else {
            console.log("No such document!");
          }
        }
        else {
          console.log("user not logged in");
        }
      } else {
        // User is signed out
        this.user = null;
        console.log("user sign out");
      }
    });
  }
  };
</script>

<style>

.notification {
  position: fixed;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  z-index: 1000;
}

.upload_btn{
  background-color: #25d366;
  border: 0;
  border-radius: 25px;
  padding: 10px;
}

.upload_btn:hover{
  background-color: #167e3c;
  color:white;
  border: 0;
  border-radius: 25px;
  padding: 10px;
}
/* Tags */
img[id='ai-img']{
    max-height:500px;
    max-width:500px;
    height:auto;
    width:auto;
}
/* Generation */
.is-invalid{
    border-color: #D9534F;
}
.download-img-btn{
  color: #000000;
  background-color: #c8f4d8;
  border: none;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  font-weight: bolder;
  padding: 1rem;
}

.download-img-btn:hover{
  color: white;
  background-color: #167e3c;
  padding: 1rem;
}
.gen-form-submit-btn{

  height: 69px;
  color: #000000;
  background-color: #c8f4d8;
  border: none;
  border-radius: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: bolder;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.gen-form-submit-btn:hover{
  box-shadow: #bde2d9 0 10px 10px 2px;
  transition-duration: .1s;
  transform: translateY(-2px);
}

.recipe-box{
  padding-top: 15px;
  padding-bottom: 15px;
}

/* misc classes */

a{
  text-decoration: none;
}
p{
  margin-top: 0;
  margin-bottom: 1rem;
}
.text-center {
  justify-content: center;
  text-align: center!important;
}
.text-start {
  text-align: left!important;
}
.info-labels{
  font-size: large;
  font-weight: bold;
  margin-bottom: 0px;
}
.info-text{
  font-size: small;
  text-align:center;
  margin-top: 0px;
  padding-top: 0px;
  margin-left: 10px;
}
.left-aligned {
  text-align: left;
}

/* 
color scheme:
- cream
FFFBF4
- light green
AEDDB3
- dark green
002E23
- black
002E23
*/

</style>