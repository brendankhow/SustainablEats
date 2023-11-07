<template>
<div class="container-fluid p-0">
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
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <router-link :to="recipe_card.recipe_link">View more</router-link>
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
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
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
                console.log('No such data!');
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
                        var recipe_image = recipe_data.recipeImageURLs[0];
                        this.recipe_cards.push({
                            recipe_id: recipe_id,
                            recipe_name: recipe_name,
                            user_id: user_id,
                            recipe_image: recipe_image,
                            recipe_link: '/post/' + recipe_id,
                        })
                    }
                }
            }
            return this.card;
        }
    },
    navigateToPost: function(recipe_id) {
        console.log("hi");
        this.router.push(`/post/${recipe_id}`);
    },
}
</script>
<style>
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
    border: 7px solid #D8F6EF;
    width: 250px;
}

.user_settings{
    background-color: #AEDDB3;
}

.user_settings_button{
    text-align: center;
}
.user_internal_navbar{
    border-top: 2px solid black;
    color:black
}

.nav-item .active{
    background-color: #AEDDB3;
}
</style>

<!-- //   // Codes for Leaderboard Ranking => Retrieving from db
//   const usersCollection = collection(db, "Users");
//         const q = query(usersCollection, orderBy("Coin", "desc"), limit(3));

//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             top3UsersCoins.value.push({
//             name: doc.data().name,
//             coin: doc.data().Coin,
//             });
//         });
// }); -->
