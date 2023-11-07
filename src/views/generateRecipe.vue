<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <!-- Generator -->
    <div class="gen-page text-center">
        <!-- header -->
        <h1 class="input-header mt-5">Generate New Recipe</h1>

        <!-- interface -->
        <div class="gen-interface mb-5 container">

            <!-- Input -->
            <!-- @submit.prevent prevents the page from refreshing everytime submit btn pressed -->
            <form class="gen-form w-100 mt-5 mx-auto p-0" @submit.prevent>
                <div class="gen-form-row w-100 mx-auto px-0 row">
                    <!-- Input field -->
                    <!-- <div class="col-md-12 mb-2">
                        <input class="gen-form-ingredients-field" type="text" placeholder="Type Here" v-model="userInput">
                    </div> -->

                    <!-- Cuisine Type Dropdown -->
                    <div class="col-md-12 mb-2">
                      <label for="cuisineType">Cuisine Type:</label>
                      <select id="cuisineType" class="gen-form-ingredients-field" v-model="cuisineType">
                        <option value="Chinese">Chinese</option>
                        <option value="Western">Western</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                      </select>
                    </div>
                    <!-- Dietary Restriction Text Area -->
                    <div class="col-md-12 mb-2">
                      <label for="dietaryRestrictions">Dietary Restrictions:</label>
                      <textarea id="dietaryRestrictions" class="gen-form-ingredients-field" v-model="dietaryRestrictions"></textarea>
                    </div>
                    <!-- Prioritized Ingredients Text Area -->
                    <div class="col-md-12 mb-2">
                      <label for="prioritizedIngredients">Prioritized Ingredients:</label>
                      <textarea id="prioritizedIngredients" class="gen-form-ingredients-field" v-model="prioritizedIngredients"></textarea>
                    </div>
                    <!-- Submit Button -->
                    <div class="col-md-12">
                        <input class="gen-form-submit-btn w-100 m-0 mx-auto px-5 mb-5" type="button" value="Generate" @click="fetchRecipe();fetchImg()">
                    </div>
                </div>
            </form>

            <!-- Loading animation -->
            <div class="spinner-border" v-if="loading">{{loading}}</div>

            <!-- Output Interface (Initially Hidden) style="display: none;"-->
            <div class="gen-out box py-5 mx-0 container" v-if="inputSubmitted && !loading">

                <div class="gen-out-header row">
                    <!-- <h1 class="recipe-title"><strong>{{ recipe.title }}</strong></h1> -->
                    <div>
                      <img v-if="recipe.image" :src="recipe.image" alt="Recipe Image"/>
                    </div>
                    <p class="recipe-desc">{{ recipe.description }}</p>
                </div>
                
                <div class="recipe-box mx-2 row">
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
                </div>

                <!-- DISCLAIMER -->
                <div class="text-center p-0 my-0 mx-0">
                    <div class="disclaimer-divider"></div>
                        <strong>DISCLAIMER: This recipe is AI-generated and has not verified it for accuracy or safety.</strong>
                    <div class="disclaimer-divider"></div>
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
  // import OpenAI from 'openai';
</script>

<script>
  import axios from 'axios';
  import OpenAI from 'openai';

  export default {

    data() {
      return {
        //no naughty take my api key ok: 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
        OPENAI_API_KEY: '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', // will key

        // user inputs
        cuisineType:'',
        dietaryRestrictions:'',
        prioritizedIngredients:'',
        
        inputSubmitted: false,
        loading: false,

        recipe: {
          // title: '',
          recipeName: '',
          image: '',
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
      async fetchRecipe() {
        console.log(this.userInput);
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

            // Now, you have the ingredients and instructions in arrays
            console.log('Ingredients:', ingredientsArray);
            console.log(ingredientsArray[3]);
            console.log('Instructions:', instructionsArray);
          } else {
            console.log('No ingredients and instructions found.');
          }
          // console.log(response.data.choices[0].message); // relevant JSON data
          // console.log(response.data.choices[0].message.content.trim()); // intended output format

        })
        .catch(error => {
          console.error('Error fetching recipe:', error);
        });
      },

      // fetch image
      async fetchImg(recipeName) {
        if(recipeName == ""){
          this.recipeName = this.prioritizedIngredients;
        }

        try{
          const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: 'generate an image: ' + recipeName,
                n: 1,
                size: '256x256',
            },
            {
                headers: {
                    Authorization: `Bearer ${this.OPENAI_API_KEY}`,
                },
            }
            );
            this.recipe.image = response.data.data[0].url;
          }
          catch{
            console.log("error");
          }
        }
    },
  };
</script>

<style>
/* Generation */
.gen-page{
  background: url("../assets/background.png");
  background-repeat: repeat;
  background-size: 400px;
  padding: 40px;

  /* !important: https://www.w3schools.com/css/css_important.asp */
  color:#002E23!important;
}
/*
.input-header{}
.gen-interface{}
.gen-form{}
.gen-form-row{}
*/
.gen-form-ingredients-field{
  background-color: #AEDDB3!important;
  padding: 12px 30px!important;
  margin: 8px 0;
  font-size: 18px!important;
  border-radius: 25px!important;
  border: 2px solid !important;
  text-align: center!important;
  width: 100%;
}
.gen-form-submit-btn{
  padding: 10px 0!important;
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
}
.gen-form-submit-btn:hover{
    opacity: 0.7;
    background-color: #003e30;
}
/*
.gen-out{}
.recipe-img{}
.recipe-desc{}
*/
.recipe-box{
  padding-top: 15px;
  padding-bottom: 15px;
}
.ingredient-col{
  background-color: lightgray;
  border: 3px solid #a8a8a8;

}
.ingredient-header{
  padding: 15px;
}
/*
.ingredient-list{}
*/
.instruction-col{
  background-color: #AEDDB3;
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
/*
.guide-header{}
.guide-content{}
*/
/* Footer */
.logo-link{
  text-decoration: none;
}
.logo-a{
  color: white; 
  font-size: 48px; 
  font-family: Poppins; 
  font-weight: 700; 
  word-wrap: break-word;
}
.logo-b{
  color: #00FF47; 
  font-size: 48px; 
  font-family: Poppins; 
  font-weight: 700; 
  word-wrap: break-word;
}
.disclaimer-divider {
  border-bottom: 5px solid black;
  width: 100%;
}
.footer{
  background-color: #242424;
}
/*
.footer-container{}
*/
.footer-text{
  font-size: 14px;
  color: #fff;
}
/*
.footer-contact{}
.contact-card{}
.contact-card-header{}
.contact-card-label{}
*/
.header-text{
  color: #fff;
}
.contact-card-content{
  transition: color 150ms;
}

.footer-socials{
  padding-top: 15px;
}
.socials-list-item{
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 0;

}
/* misc classes */
/* div{
  border: 1px dotted;
} */
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