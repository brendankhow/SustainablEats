<template>
  <div class="container-fluid p-0">
    <div class="profile-banner">
        <img src="../assets/banner.jpg" class="img-fluid">
    </div>    
</div>
<div class="container-fluid">
    <div class="row ms-4 me-4 user_details pt-3 pb-2">

        <div class="col-lg-3 col-md-12 d-flex justify-content-center">
            <img class="p-0 rounded-circle profile_picture" src="../assets/math_cat.jpg" width="250" height="250">
        </div>

        <div class="col">
            <div class="row pt-5">
                <div class="col" id="user_content">
                    <h1 id="username" style="text-align:left">{{ }}</h1>
                <p id="userdescription" style="text-align:left">
                    {{}}
                </p>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12 user_settings_button">
                    <button class="user_settings p-3 rounded-4 border-0 fw-bold"><span><img src="../assets/gear-fill.png" width="25"> User Settings</span></button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <div class="container-fluid mt-2">
    <div class="row ms-4 me-4 pb-2 user_internal_navbar">
        <ul class="nav justify-content-center ">
            <li class="nav-item active">
                <button class="nav-link active text-black" href="#" >
                    <img src="">
                    Posts
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link text-black" href="#">
                    <img src="">
                    Bookmarked
                </button>
            </li>
        </ul>
    </div>
</div> -->

<!-- <div class="user_chosen_content">
    <div class="album py-5">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="" class="card-img-top" alt="Image" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col">
                                    <h5 class="card-title">PokeBowl</h5>
                                </div>
                                <div class="col" style="text-align: right;">
                                    <img src="" width="20px">
                                    <small class="text-muted">4.5 ratings </small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                
                                <small class="text-muted">100+ reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->
</template>

<script setup>
import { useRouter } from "vue-router";
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
            var usersCollection = collection(db, "Users");

            // Specify the document's path using the user's UID
            const docRef = doc(usersCollection, uid);

            // Retrieve the document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                var user_data = docSnap.data();
                var username = user_data.username;
                var bio = user_data.bio;
                var profile_picture = user_data.profile_picture;
                var profile_banner = user_data.profile_banner;
                var email = user_data.email;
                var posts = user_data.posts;
                var bookmarks = user_data.bookmarks;
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        } else {
            // User is signed out
            // ...
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