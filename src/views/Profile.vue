<template>
<div class="container-fluid p-0">
    <div class="profile-banner">
        <img id="profile_banner_img" src="" class="img-fluid">
    </div>    
</div>
<div class="container-fluid">
    <div class="row ms-4 me-4 user_details pt-3 pb-2">

        <div class="col-lg-3 col-md-12 d-flex justify-content-center">
            <img id="profile_picture" class="p-0 rounded-circle profile_picture" src="" width="250" height="250">
        </div>

        <div class="col">
            <div class="row pt-5">
                <div class="col" id="user_content">
                    <h1 id="username" style="text-align:left" ></h1>
                <p id="userdescription" style="text-align:left"></p>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12 user_settings_button">
                    <button class="user_settings p-3 rounded-4 border-0 fw-bold"><span><img src="../assets/gear-fill.png" width="25"> User Settings</span></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid mt-2">
    <div class="row ms-4 me-4 pb-2 user_internal_navbar">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <button id="post_button" class="nav-link text-black active" v-on:click="display('posts')">
                    <img src="../assets/bxs-grid.png">
                    Posts
                </button>
            </li>
            <li class="nav-item">
                <button id="bookmark_button" class="nav-link text-black" v-on:click="display('bookmark')">
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
                
            </div>
        </div>
    </div>
</div>
</template>
<script setup>

import { useRouter } from "vue-router";
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const db = getFirestore();
const auth = getAuth();
const router = useRouter() // get a reference to our vue router
const user_data = ref(null);
const username = ref('');
const bio = ref('');
const profilepic = ref('');
const profilebanner = ref('');
// Define a ref to hold the image URL

var dcontent = 'post';
function display(content){
    if (content == "posts"){
        document.getElementById("bookmark_button").classList.remove("active");
        document.getElementById("post_button").classList.add("active")
        this.dcontent = 'post';
        showcontent(dcontent);
    }else{
        document.getElementById("bookmark_button").classList.add("active");
        document.getElementById("post_button").classList.remove("active")
        this.dcontent = 'bookmark';
        showcontent(dcontent);
    }
}

showcontent('post');
function showcontent(dcontent){
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try{
            const uid = user.uid;
            var usersCollection = collection(db, "Users");

            // Specify the document's path using the user's UID
            const docRef = doc(usersCollection, uid);

            // Retrieve the document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const user_data = docSnap.data();
                var display_ele = document.getElementById("chosencontent");

                if(dcontent == 'post'){
                    var content_data = user_data.posts;
                }else{
                    var content_data = user_data.bookmarks;
                }
                if(content_data.length == 0){
                    display_ele.innerHTML = "<h1>No content to display. Start exploring!</h1>";
                }else{
                    const recipecollection = collection(db, 'recipes');
                    var content_to_add = '';
                    for(let recipeID of content_data){
                        const reciperef = doc(recipecollection, recipeID);
                        const recipeDoc = await getDoc(reciperef);
                        if(recipeDoc.exists()){
                            const recipe_data = recipeDoc.data();
                            var recipeImg = recipe_data.imageId;
                            const imageUrl = await getImageUrl(recipeImg);
                            
                            var recipeName = recipe_data.name;
                            content_to_add += `
                                                <div class="album py-5">
                                <div class="container" id="chosencontent">
                                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-auto g-3" id="albumCards">
                                        <!-- Modify the width and height of the card -->
                                        <div class="col" style="max-width: 300px;">
                                            <div class="card">
                                                <!-- Set the max-height for the image container -->
                                                <div style="max-height: 250px; overflow: hidden;">
                                                    <img src="${imageUrl}" class="card-img-top" alt="Image">
                                                </div>
                                                <div class="card-body">
                                                    <div class="row pb-2">
                                                        <div class="col">
                                                            <h5 class="card-title" style='text-align:left;overflow:auto;'>${recipeName}</h5>
                                                        </div>
                                                        <div class="col" style="text-align: right;">
                                                            <img src="" width="20px">
                                                            <small class="text-muted">4.5 ratings </small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                    }
                    document.getElementById('albumCards').innerHTML = content_to_add;
                }
            }
            else{console.log("No such document!");}
            }
            catch{
                console.error();
            }
        }
    });
}
async function getImageUrl(imageId) {
    const storage = getStorage();
    const imageRef = storageRef(storage, `recipeImages/${imageId}`);

    try {
        const url = await getDownloadURL(imageRef);
        return url;
    } catch (error) {
        console.error(`Failed to get download URL for imageId: ${imageId}`, error);
    }
}

onMounted(()=>{
    onAuthStateChanged(auth, async (user) => {
    try{
        if (user) {
            const uid = user.uid;
            var usersCollection = collection(db, "Users");

            // Specify the document's path using the user's UID
            const docRef = doc(usersCollection, uid);

            // Retrieve the document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const user_data = docSnap.data();
                var username = user_data.username;
                var bio = user_data.bio;
                var email = user_data.email;
                var posts = user_data.posts;
                var bookmarks = user_data.bookmarks;
                var profilepic = user_data.profilepic;
                var profilebanner = user_data.profilebanner;
                //DISPLAY DATA
                try{
                    document.getElementById("username").innerText = username;
                    document.getElementById("userdescription").innerText = bio;
                    document.getElementById("profile_picture").setAttribute("src", profilepic);
                    document.getElementById("profile_banner_img").setAttribute("src",profilebanner);    
                }
                catch{
                    console.log("");
                }
                
            } else {
                
                // router.push('/Home');
                console.log("No such document!");
            }
        } else {
            // User is signed out
            router.push('/Register');
        }
    }
    catch{
        console.log("");
    }
        
    });
});

    
//   // Codes for Leaderboard Ranking => Retrieving from db
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
// });

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