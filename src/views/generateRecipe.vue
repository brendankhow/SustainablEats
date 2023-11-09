<template>

    <!-- Generator -->
    <div class="gen-page text-center">
        <!-- header -->
        <h1 class="gen-header mt-5 container">Generate New Recipe</h1>

        <!-- interface -->
        <div class="gen-interface mb-5 container">

            <!-- Input -->
            <!-- @submit.prevent prevents the page from refreshing everytime submit btn pressed -->
            <form class="gen-form w-100 mt-5 mx-auto p-0" @submit.prevent action="./ModifyRecipe.vue">
                <div class="gen-form-row w-100 mx-auto px-0 row">
                    <!-- Input field -->

                    <div class="col">
                      <label for="creator" class="info-labels">Creator Name:</label>
                      <input type="text" id="creator" v-model="creator" class="gen-form-ingredients-field" disabled v-if="user" >
                      <input type="text" id="creator" v-model="creator" class="gen-form-ingredients-field" v-else>
                    </div>

                    <!-- Cuisine Type Dropdown -->
                    <div class="col-md-12 mb-2">
                      <label for="cuisineType" class="info-labels">Cuisine Type:</label>
                      <select id="cuisineType" class="gen-form-ingredients-field" v-model="cuisineType" :class="{'is-invalid': !cuisineType}">
                        <option value="Chinese">Chinese</option>
                        <option value="Western">Western</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                      </select>
                      <div v-if="!cuisineType" class="text-danger info-text">Choose one cuisine type!</div>
                    </div>
                    <!-- Dietary Restriction Text Area -->
                    <div class="col-md-12 mb-2">
                      <label for="dietaryRestrictions" class="info-labels">Dietary Restrictions:</label>
                      <textarea id="dietaryRestrictions" class="gen-form-ingredients-field" v-model="dietaryRestrictions"></textarea>
                      <div class="text-secondary info-text">commma-separated</div>
                    </div>
                    <!-- Prioritized Ingredients Text Area -->
                    <div class="col-md-12 mb-2">
                      <label for="prioritizedIngredients" class="info-labels">Prioritized Ingredients:</label>
                      <textarea id="prioritizedIngredients" class="gen-form-ingredients-field" @input="checking_ingredients" v-model="prioritizedIngredients"></textarea>
                      <div class="text-secondary info-text">commma-separated</div>
                      <div class="text-danger" v-if="!checkingredients" >Do Not Leave This Blank</div>
                      
                    </div>
                    <!-- Submit Button -->
                    <div class="col-md-12 submit-btn-div">
                        <input class="gen-form-submit-btn w-100 m-0 mx-auto px-5 mb-5" type="button" value="Generate" @click="fetchRecipe();fetchImg()">
                    </div>
                </div>
            </form>

          <!-- Loading animation -->
          <div class="row spinner-border" v-if="loading"></div>

            <!-- Output Interface (Initially Hidden) style="display: none;"-->
            <div class="gen-out box py-5 mx-0 container" v-if="inputSubmitted && !loading">

                <div class="gen-out-header row">
                    <h1 class="recipe-title" v-if="recipe.recipeName"><strong>{{ recipe.recipeName }}</strong></h1>
                    <div class="ai-img">
                      <img id="ai-img" v-if="recipe.image" :src="recipe.image" alt="Recipe Image"/>
                    <div>
                        <p>Like this image? Download it here: </p>
                      <a v-if="recipe.image" :href="recipe.image" target="_blank">
                        <button class="download-img-btn">Download Image</button>
                      </a>
                      </div>

                    </div>
                    <p class="recipe-desc">{{ recipe.description }}</p>
                </div>
                
              <div class="row recipe-box mx-2">
                    <div class="ingredient-col col-md-6 col-sm-12 col-12">
                        <h3 class="ingredient-header text-center">Ingredients</h3>
                        <ul class="ingredient-list left-aligned">
                          <li v-for="(ingredient, index) in recipe.ingredientsArray" :key="index">
                            <span v-if="index === 0">{{ ingredient.replace('- ', '') }}</span>
                            <span v-else>{{ ingredient }}</span>
                          </li>
                        </ul>
                    </div>
                    
                    <div class="instruction-col col-md-6 col-sm-12 col-12" id="instructions">
                        <h3 class="instruction-header text-center">Steps</h3>
                        <ol class="instruction-list left-aligned">
                          <li v-for="instruction in recipe.instructionsArray">{{ instruction.split('. ').slice(1).join('. ') }}
                            <span v-if="instruction === ''"></span>
                          </li>
                        </ol>
                    </div>

                    <!-- DISCLAIMER -->
                    <div class="text-center p-0 my-0 mx-0">
                      <div class="disclaimer-divider"></div>
                          <strong>DISCLAIMER: This recipe is AI-generated and has not verified it for accuracy or safety.</strong>
                      <div class="disclaimer-divider"></div>
                  </div>
              </div>

              <br><br>
              <p>Like what you see? Download the image here and upload it with the recipe!</p>

              <div class="row-lg-12 row-md-12 row-sm-12 mb-2">
                <div class="col d-flex justify-content-center" v-if="selectedImage">
                    <img id="user_pic" :src="selectedImage" class="rounded-circle border border-5 border-black " width="150" height="150">
                </div>

                <div class="col d-flex align-items-center mt-3" >
                  <input class="row form-control" type="file" id="userimage" @change="previewImage" accept="image/*">
                  <br><br>
                  <button type="button" @click="uploadImageAndCreateRecipe" class="row btn btn-success">Upload to Profile</button>
                </div>
              </div>              
            </div>  
        </div>
    </div>

    <!-- Guide -->
  <div class="guide-container mt-0 pt-5 pb-5 b-10 mx-auto container-fluid">

    <div class="guide-section mt-0 pb-3 px-2 px-md-5 container">
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
  <div class="guide-main mx-auto">

        <!-- Content -->
        <!-- Insert more here -->
        <div class="guide-content mx-auto">
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
        //no naughty take my api key ok: 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
        OPENAI_API_KEY: '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', // will key

        // for database
        creator: '',
        user: null,
        recipeName: '',
        mealType: '',

        description: '',
        ingredients: [],
        steps: [],
        selectedImage: "https://firebasestorage.googleapis.com/v0/b/sustainableats-890e0.appspot.com/o/recipeImages%2Fdefault_large.png?alt=media&token=0138452f-d283-45f9-b32f-86bf0dd9119e",
        imageUploadProgress: 0,
        recipeImageURLs: [],

        // user inputs
        cuisineType:'',
        dietaryRestrictions:'',
        prioritizedIngredients:'',
        checkingredients: false,
        inputSubmitted: false,
        loading: false,

        recipe: {
          recipeName: '',
          image: 'default_large.png',
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
                    this.recipe.image = uniqueID;
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
  async previewImage(event) {
        const file = event.target.files[0];
        if (file) {
          console.log(file);
            const reader = new FileReader();
            reader.onload = async (e) => {
                // upload to Firebase Storage
                const timestamp = new Date().getTime();
                const randomString = Math.random().toString(36).substring(2, 8);
                const uniqueID = `${timestamp}_${randomString}`;
                
                const fileName = file.name + `${uniqueID}`;
                console.log(fileName);
                const storageRef = ref(storage, 'recipeImages/' + fileName);
                await uploadBytes(storageRef, file);
                
                // get download URL
                const url = await getDownloadURL(storageRef);
                console.log(url);
                this.selectedImage = url;
                this.recipe.image = url;
            };
            reader.readAsDataURL(file);
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
/* Tags */
img[id='ai-img']{
    max-height:500px;
    max-width:500px;
    height:auto;
    width:auto;
}
/* Generation */
.gen-page{
  background: url("../assets/background.png");
  background-repeat: repeat;
  background-size: 400px;
  padding: 40px;
  margin-top: 40px;
}
.gen-header{
  width: auto;
  font-family: Raleway;
  text-align: center;
  color:#FFFBF4;
  font-weight: bold;

  background-color: #000;

  margin-bottom: 0px;

  border-radius: 20px 20px 0 0;

  padding: 1rem;

}

.gen-interface{
  width: auto;
  background-color:#AEDDB3;
  border-radius: 0 0 20px 20px;
  border: #000 2px solid;
}

.gen-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.gen-form-ingredients-field{
  background-color: #e0ffe3!important;
  padding: 12px 30px!important;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px!important;
  border-radius: 25px!important;
  border: 2px solid;
  text-align: center!important;
  width: 100%;
}
.is-invalid{
    border-color: #D9534F;
}
.submit-btn-div{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}
.download-img-btn{
  height: 69px;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  font-weight: bolder;

  padding: 1rem;
}
.gen-form-submit-btn{

  height: 69px;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: bolder;
  
}
.gen-form-submit-btn:hover{
    opacity: 0.7;
    background-color: #003e30;
}

.recipe-box{
  padding-top: 15px;
  padding-bottom: 15px;
}
.ingredient-col{
  background-color:#002E23;
  border: 3px solid #002E23;
  color: #FFFBF4;
}
.ingredient-header{
  padding: 15px;
}

.instruction-col{
  background-color:#e0fbe3;
  border: 3px solid #002E23;

}
.instruction-header{
  padding: 15px;
}

/* Guide */
.guide-container{
  background-color: #002e23;
}
.guide-section{
  background-color: #AEDDB3;
  border-radius: 15px;
}
.guide-main{
  padding: 20px 30px;
  background-color: #FFFBF4;
  border-radius: 15px;
}
.guide-content{
  padding: 0px 15px 15px 15px;
}
.guide-divider {
  border-bottom: 2px solid black;
  width: 100%;
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