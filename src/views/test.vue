<div class="gen-page text-center">
    <!-- header -->
    <h1 class="container" style="margin-top: 50px">Generate New Recipe</h1>

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
                    <button class="gen-form-submit-btn w-100 m-0 mx-auto px-5 mb-5" role="button" @click="fetchRecipe();fetchImg()">
                      <span class="info-labels">Generate</span>
                    </button>
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