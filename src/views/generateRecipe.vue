<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

  <main>
    <!-- Generator -->
    <div class="gen-page text-center">
        <!-- header -->
        <h1 class="input-header mt-5">Generate New Recipe</h1>

        <!-- interface -->
        <div class="gen-interface mb-5 container">

            <!-- Input -->
            <form class="gen-form w-100 mt-5 mx-auto p-0" >
                <div class="gen-form-row w-100 mx-auto px-0 row">
                    <!-- Input field -->
                    <div class="col-md-12 mb-2">
                        <input class="gen-form-ingredients-field" type="text" placeholder="Type Here" :value="userInput">
                    </div>
                    <!-- Submit Button -->
                    <div class="col-md-12">
                        <input class="gen-form-submit-btn w-100 m-0 mx-auto px-5 mb-5" type="submit" value="Generate" @click="fetchRecipe">
                    </div>
                </div>
            </form>

            <!-- Output Interface (Initially Hidden) style="display: none;"-->
            <div class="gen-out box py-5 mx-0 container" >

                <div class="gen-out-header row">
                    <h1 class="recipe-title">{{ recipe.title }}</h1>
                    <div>
                        <img class="recipe-img img-fluid" :src="recipe.img" id="recipe_image">
                    </div>
                    <p class="recipe-desc">{{ recipe.description }}</p>
                </div>
                
                <div class="recipe-box mx-2 row">
                    <div class="ingredient-col col-md-6 col-sm-12 col-12">
                        <h3 class="ingredient-header text-center">Ingredients</h3>
                        <ul class="ingredient-list">
                          <li v-for="ingredient in recipe.ingredientsArray">{{ ingredient }}</li>
                        </ul>
                    </div>
                    
                    <div class="instruction-col col-md-6 col-sm-12 col-12" id="instructions">
                        <h3 class="instruction-header text-center">Steps</h3>
                        <ol class="instruction-list">
                          <li v-for="instruction in recipe.instructionsArray">{{ instruction }}</li>
                        </ol>
                    </div>
                </div>

                <!-- Appears only after submit button has been pressed -->
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
                        <strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae animi ad minima veritatis dolore. Architecto facere dignissimos voluptate fugit ratione molestias quis quidem exercitationem voluptas.</strong>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae animi ad minima veritatis dolore. Architecto facere dignissimos voluptate fugit ratione molestias quis quidem exercitationem voluptas.
                    </p>
                </div>
            </div>
        </div>

    </div>

  </main>
          
</template>

<script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.min.js';
  import { useRouter } from "vue-router";
  import axios from 'axios';
</script>

<script>
  import axios from 'axios';

//   function translateRecipeContent(content) {
//   // Split the content into ingredients and instructions based on LINE BREAKS
//   const parts = content.split('\n\n');
//   console.log(parts);

//   if (parts.length >= 2) {
//     const ingredients = parts[0].replace('Ingredients:', '').trim().split('\n');
//     const instructions = parts[1].replace('Instructions:', '').trim().split('\n');

//     return {
//       ingredients,
//       instructions,
//     };
//   } else {
//     return {
//       ingredients: [],
//       instructions: [],
//     };
//   }
// }

  export default {

    data() {
      return {
        //no naughty take my api key ok: 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
        OPENAI_API_KEY: "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", // will key

        userInput:'',

        recipe: {
          title: '',
          image: '',
          description: '',
          ingredientsArray: [],
          instructionsArray: [],
        },
      };
    },

    methods: {
      fetchRecipe() {
        console.log(this.userInput);
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
                  // 'content': this.userInput
                  'content': 'create a pasta recipe'
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
          const recipeData = response.data.choices[0].message.content.split('Ingredients:\n');
          if (recipeData.length > 1) {
            const ingredientsPart = recipeData[1];
            const [ingredients, instructions] = ingredientsPart.split('Instructions:\n');
            
            // Format ingredients and instructions as arrays
            const ingredientsArray = ingredients.split('\n- ').map(item => item.trim());
            const instructionsArray = instructions.split('\n').filter(item => item.trim() !== '');
            
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
    },
    created() {
      this.fetchRecipe();
    }
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

/*
.gen-out{}
.recipe-title{}
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