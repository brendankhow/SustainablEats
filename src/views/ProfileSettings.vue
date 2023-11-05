<template>
    <div class="container">
        <div class="row mt-3 header">
            <div class="col d-flex align-items-start">
                <img src="../assets/angle-left.png" class="d-inline-block d-flex" onclick="history.back()" width="50">
                <h1 class="d-inline-block"><b>SETTINGS</b></h1>
            </div>
            <div class="col d-flex flex-row-reverse pb-2">
                <button class="btn btn-danger text-white fw-bold">DELETE ACCOUNT</button>
            </div>
            <hr>
        </div>
        <form>
            <div class="row customization">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col" style="display:flex; align-content: flex-start;">
                            <img src="../assets/pencil.png" height="30px" class="d-inline-block "><h4 class="d-inline-block ms-2">
                                Customization</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="container-fluid">
                            <div class="row ms-4 me-4 user_details pt-3 pb-2">

                                <div class="col-lg-6 col-md-12 col-sm-12 mb-2">
                                        <div class="col d-flex justify-content-center" v-if="profilepic">
                                            <img id="user_pic" :src="profilepic" class="rounded-circle border border-5 border-black " width="150" height="150">
                                        </div>

                                        <div class="d-flex align-items-center mt-3" >
                                                <input class="form-control" type="file" id="profilefile" @change="previewImage" accept="image/*">
                                        </div>
                                </div>

                                <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="col d-flex justify-content-center" v-if="bannerpic">
                                            <img id="user_banner" :src="bannerpic" class=" border border-5 border-black" width="250" height="150">
                                        </div>

                                        <div class="col d-flex align-items-center mt-3">
                                            <input class="form-control" type="file" id="bannerfile" @change="previewBanner" accept="image/*">
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-2">
                </div>
            </div>

            <!-- ================================USER DETAILS===================================================================================-->
            <div class="row user_details">
                <div class="container-fluid">
                    <img src="../assets/user.png" height="30px" class="d-inline-block ">
                    <h4 class="d-inline-block ms-2">User Details</h4>

                    
                    <div class="row mb-3 mt-2">
                        <label for="username" class="col-lg-2 col-md-12 col-form-label fw-bold">USERNAME:</label>
                        <div class="col-lg-10 col-md-12 col-sm-12">
                            <input type="text" class="form-control border-0" id="username" style="background-color:#EDF8FF;" v-model="username">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="username" class="col-lg-2 col-md-12 col-form-label fw-bold">BIOGRAPHY:</label>
                        <div class="col-lg-10 col-md-12 col-sm-12">
                            <textarea v-model="bio" class="form-control border-0" id="exampleFormControlTextarea1" rows="3" style="background-color:#EDF8FF; resize: none;">
                                </textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col d-flex flex-row-reverse pb-2">
                            <button class="btn btn-primary text-white fw-bold" @click="updateUserdetails">SUBMIT & SAVE</button>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            </form>
            <form>
            <div class="row">
                <div class="container-fluid">
                    <img src="../assets/lock.png" height="30px" class="d-inline-block ">
                    <h4 class="d-inline-block ms-2">Security</h4>
                </div>
                <div class="row mb-3 mt-2">
                    <label for="email" class="col-lg-2 col-md-12 col-form-label fw-bold">EMAIL ADDRESS:</label>
                    <div class="col-lg-10 col-md-12 col-sm-12">
                        <input type="email" class="form-control border-0" id="email" style="background-color:#EDF8FF;" v-model="email">
                    </div>
                </div>
                <div class="row mb-3 mt-2">
                    <label for="old_password" class="col-lg-2 col-md-12 col-form-label fw-bold">OLD PASSWORD:</label>
                    <div class="col-lg-10 col-md-12 col-sm-12">
                        <input type="password" class="form-control border-0" id="old_password" style="background-color:#EDF8FF;" v-model="old_password">
                    </div>
                </div>
                <div class="row mt-2">
                    <label for="new_password" class="col-lg-2 col-md-12 col-form-label fw-bold">NEW PASSWORD:</label>
                    <div class="col-lg-10 col-md-12 col-sm-12">
                        <input type="password" class="form-control border-0" id="new_password" style="background-color:#EDF8FF;" v-model="new_password">
                        <div>
                            <ul class="text-muted" id="problems">
                                <li v-for="(problem, index) in problems" :key="index">{{ problem }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="confirm_password" class="col-lg-2 col-md-12 col-form-label fw-bold">CONFIRM PASSWORD:</label>
                    <div class="col-lg-10 col-md-12 col-sm-12">
                        <input type="password" class="form-control border-0" id="confirm_password" style="background-color:#EDF8FF;" v-model="confirm_password">
                        <div>
                            <ul class="text-muted" id="confirm_problems">
                                <li v-for="(problem, index) in confirm_problems" :key="index">{{ problem }}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex flex-row-reverse pb-2">
                        <button class="btn btn-primary text-white fw-bold" @click="updateUsersecurity" :disabled="isPasswordInvalid">SUBMIT & SAVE</button>
                        <button class="btn text-white fw-bold me-2" style="background-color: #B0B0B0;">CANCEL</button>
                    </div>
                </div>
                <hr class="mt-2">
            </div>
        </form>
    </div>
</template>
<script>
import { useRouter } from "vue-router";
import { getFirestore, collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';

export default{
    data(){
        return{
            profilepic: "", 
            bannerpic: "",
            confirm_password: "",
            email: "",
            username: "",
            bio: "",
            old_password: "",
            new_password: "",
            isPasswordInvalid: true,
            problems: [],
            confirm_problems: [],

        }
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profilepic = e.target.result;
            };
            reader.readAsDataURL(file);
            }
        },
        previewBanner(event) {
            const file = event.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.bannerpic = e.target.result;
            };
            reader.readAsDataURL(file);
            }
        },
        checkPasswordCriteria() {
        this.problems = []; // reset problems
        if (this.new_password.length < 8) {
            this.isPasswordInvalid = true;
            this.problems.push('Password must be at least 8 characters long.');
        }
        if (!/\d/.test(this.new_password)) {
            this.isPasswordInvalid = true;
            this.problems.push('Password must contain at least one digit.');
        }
        if (!/[a-z]/.test(this.new_password)) {
            this.isPasswordInvalid = true;
            this.problems.push('Password must contain at least one lowercase letter.');
        }
        if (!/[A-Z]/.test(this.new_password)) {
            this.isPasswordInvalid = true;
            this.problems.push('Password must contain at least one uppercase letter.');
        }
        if(this.problems.length == 0 && this.confirm_password == this.new_password && this.confirm_password != "" && this.new_password != ""){
            this.isPasswordInvalid = false;
        }
        },
        checkconfirmpassword(){
            this.confirm_problems = []; // reset problems
            if (this.confirm_password != this.new_password) {
                this.confirm_problems.push('Password does not match.');
                this.isPasswordInvalid = true;
            }else{
                this.isPasswordInvalid = false;
            }
        },
    },
    watch: {
        new_password() {
            this.checkPasswordCriteria();
        },
        confirm_password(){
            this.checkconfirmpassword();
        }
    },
    async mounted(){
    const auth = getAuth();
    const db = getFirestore();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            if (docSnap.exists()) {
                this.username = docSnap.data().username;
                this.bio = docSnap.data().bio;
                this.profilepic = docSnap.data().profilepic;
                this.bannerpic = docSnap.data().profilebanner;
            }
        }
        });
    }
}

</script>