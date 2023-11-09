<template>
    <!-- Google Font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

<div class="container-fluid p-0" style="margin-top: 80px">
    <div class="profile-banner">
        <img id="profile_banner_img" :src="profilebanner" class="img-fluid">
    </div>
</div>
<div class="container-fluid">
    <div class="row ms-4 me-4 user_details pt-3 pb-2">

        <div class="col-lg-3 col-md-12 d-flex justify-content-center">
            <img id="profile_picture" :src="profilepic" class="p-0 rounded-circle profile_picture" src="" width="250" height="250">
        </div>
        <div class="col">
            <div class="row pt-5">
                <div class="col" id="user_content">
                    <h1 id="username" style="text-align:left" >{{username}}</h1>
                <p id="userdescription" style="text-align:left">{{bio}}</p>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12 user_settings_button">
                    <router-link to="/profilesettings">
                        <button class="user_settings p-3 rounded-4 border-0 fw-bold">
                            <span>
                                <img src="../assets/gear-fill.png" width="25">
                                User Settings
                            </span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid mt-2">
    <div class="row ms-4 me-4 pb-2 user_internal_navbar">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <button id="post_button" class="nav-link text-black" :class="{ active: this.content == 'post' }" v-on:click="display('post')">
                    <img src="../assets/bxs-grid.png">
                    Posts
                </button>
            </li>
            <li class="nav-item">
                <button id="bookmark_button" class="nav-link text-black" :class="{ active: this.content == 'bookmark' }" v-on:click="display('bookmark')">
                    <img src="../assets/bookmarks.png">
                    Bookmarked
                </button>
            </li>
        </ul>
    </div>
</div>
<div class="user_chosen_content">
    <div class="album py-5">
        <div class="container" id="chosencontent">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-auto g-3" id="albumCards">
                <div class="col" style="max-width: 300px;" v-for="recipe_card of recipe_cards" v-if="recipe_cards && recipe_cards.length">
                    <div class="card">
                        <!-- Set the max-height for the image container -->
                        <div style="max-height: 250px; overflow: hidden;">
                            <img :src="recipe_card.recipe_image" class="card-img-top" alt="Image">
                        </div>
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title" style="text-align: left; overflow:auto">{{recipe_card.recipe_name}}</h5>
                                </div>


                                <div class="card-row button-row">
                                    <router-link :to="recipe_card.recipe_updateLink" class="UpdateButton" v-if="content === 'post'">Update</router-link>
                                    <button v-if="content === 'post'" class="likeButton" @click="deleteRecipe(recipe_card.recipe_id)">Delete</button>
                                </div>
    

                                <div class="card-row">
                                    <router-link :to="recipe_card.recipe_link" class="view-more-button" v-if="content === 'post'">View More</router-link>
                                </div>
    <!-- View More button row -->


                                <div class="card-row button-row">
                                    <router-link :to="recipe_card.recipe_link" class="view-more-button" v-if="content === 'bookmark'">View More</router-link>
                                    <button v-if="content === 'bookmark'" class = "likeButton" @click="removeBookmark(recipe_card.recipe_id)">Remove Bookmark</button>
                                </div>
    
                            </div>

                        </div>
                    </div>
                </div>
                <h1 class="container text-center" v-else>No content to display</h1>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { useRouter } from "vue-router";
import { getFirestore, collection, getDoc, doc, setDoc, deleteDoc, updateDoc, updateRef } from 'firebase/firestore';
import { deleteObject, getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();
const router = useRouter() // get a reference to our vue router

export default {
    setup(){
        const router = useRouter();
        return {
        router, // make router available to the template and other options
        };
    },
    data(){
        return {
            uid: '',
            user_data: ref(null),
            username: ref(''),
            bio: ref(''),
            profilepic: null,
            profilebanner: null,
            posts: [],
            bookmarks: [],
            content:  'post',
            recipe_cards: [],
            cancellationToken: null,
        };
    },
    mounted() {
    onAuthStateChanged(auth, async (user) => { // add async here
        if(user){
            this.uid = user.uid;
            var usersCollection = collection(db, "Users");

            const docRef = doc(usersCollection, this.uid);
            const docSnap = await getDoc(docRef); // add await here

            if(docSnap.exists()){
                this.user_data = docSnap.data();
                this.username = this.user_data.username;
                this.bio = this.user_data.bio;
                this.email = this.user_data.email;
                this.profilepic = this.user_data.profilepic;
                this.profilebanner = this.user_data.profilebanner;
                this.cards = this.showcontent(this.content, this.cards);
            }else{
                console.log('');
            }
        }else{
            this.router.push('/sign-in');
        }
    });
    },
    methods:{
        display: function(type){
            this.content=type;
            this.card = ''; //reset the card
            this.showcontent(type);
            this.recipe_cards = [];
            
        },
        deleteRecipe: async function (recipeId) {
        const recipeCollection = collection(db, 'recipes');
        const recipeRef = doc(recipeCollection, recipeId);

        try {
            // Get the recipe data to access the image URL
            const recipeDoc = await getDoc(recipeRef);
            const recipeData = recipeDoc.data();

            // Delete the recipe image from Firebase Storage
            const imageRef = storageRef(getStorage(), recipeData.recipeImageURLs[0]);
            await deleteObject(imageRef);

            // Delete the recipe document
            await deleteDoc(recipeRef);

            // Update the user's posts array by removing the deleted recipe's ID
            this.user_data.posts = this.user_data.posts.filter(post => post !== recipeId);

            // Update the user document in the database
            const usersCollection = collection(db, "Users");
            const userRef = doc(usersCollection, this.uid);
            await setDoc(userRef, this.user_data);

            // Update the UI to remove the deleted recipe card
            this.recipe_cards = this.recipe_cards.filter(card => card.recipe_id !== recipeId);
        } catch (error) {
            console.error("");
        }
    },
        showcontent: async function(content){
            
            if (this.user_data) {
                if(content == 'post'){
                    var content_data = this.user_data.posts;
                }else{
                    var content_data = this.user_data.bookmarks;
                }
                if(content_data.length == 0){
                    this.card = "<h1 class='text-center'>Nothing to display!</h1>"
                }else{
                    for(let data of content_data){
                        const recipecollection = collection(db, 'recipes');
                        
                        const reciperef = doc(recipecollection, data);
                        
                        const recipeDoc = await getDoc(reciperef);
                        

                        var recipe_data = recipeDoc.data();
                        var recipe_id = recipe_data.autoGeneratedID;
                        var recipe_name = recipe_data.name;
                        var user_id = recipe_data.userId;
                        var recipe_image = `${recipe_data.recipeImageURLs[0]}?timestamp=${Date.now()}`; // Add cache-busting query parameter
                        this.recipe_cards.push({
                            recipe_id: recipe_id,
                            recipe_name: recipe_name,
                            user_id: user_id,
                            recipe_image: recipe_image,
                            recipe_link: '/post/' + recipe_id,
                            recipe_updateLink: '/postUpdate/' + recipe_id,
                        })
                    }
                }
            }
            return this.card;
        },

        removeBookmark: async function (recipeId) {
            const userRef = doc(db, 'Users', this.uid);

            try {
                // Get user doc in firebase
                const userDoc = await getDoc(userRef);
                const userData = userDoc.data();

                // Update the user's bookmark array by removing the index of the recipe ID
                const bookmarkList = userData.bookmarks;
                var index = bookmarkList.indexOf(recipeId);
                if (index > -1) {
                    bookmarkList.splice(index, 1);
                }

                // Update UI 
                localStorage.setItem(`bookmark_${recipeId}`, false);

                // Update the UI to remove the deleted recipe card
                this.recipe_cards = this.recipe_cards.filter(card => card.recipe_id !== recipeId);

                await updateDoc(userRef, {
                    bookmarks: bookmarkList
                })

            } catch (error) {
                console.error('');
            }
        }
    },
    navigateToPost: function(recipe_id) {
        this.router.push(`/post/${recipe_id}`);
    },
}
</script>
<style>


.buttonStyle {
    font-family: "Poppins", sans-serif;
    border-radius: 50px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    margin: 10px 5px;
    letter-spacing: 1px;
    padding: 8px 25px;
}

.container-fluid {
    position: relative;
    padding: 0;
}

.profile-banner {
    width: 100%;
    height: 300px; /* Set the desired height for your banner */
    overflow: hidden;
}

.profile-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter:brightness(50%)
}

.profile_picture{
    border: 7px solid #25d366;
    width: 250px;
}

.user_settings{
    background-color: #AEDDB3;
}

.user_settings_button{
    text-align: center;
}
.user_internal_navbar{
    border-top: 2px solid #25d366;
    color:black
}

.nav-item .active{
    background-color: #AEDDB3;
}


.card-row {
  padding: 10px;
  text-align: center;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.UpdateButton{
    background-color: #e9ecec;
  color: black;
  flex: 1;
  padding: 8px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 10px;
  font-weight: bold;
}
.UpdateButton:hover{
  background-color: #0056b3;
  color: white;
}

.likeButton,
.bookmarkButton {
  flex: 1;
  padding: 8px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 10px;
  font-weight: bold;
}
.likeButton:hover,
.bookmarkButton:hover {
  background-color: #0056b3;
  color: white;
}

.view-more-button:hover {
  background-color: #24a152;
  color:white;
  padding: 10px 20px;
  box-shadow: 0 0 0 0 rgba(8, 136, 8, 0.7);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
 }
 .view-more-button {
  background-color: #25D366;
  font-weight: bold;
  padding: 10px 20px;
  color: #212529;
  border-radius: 10px;
 }

</style>