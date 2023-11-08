<template>

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="background-container">
        <div class="wrapper">
            
                <h1>Register</h1>
                    <div class="input-box">
                        <input type="text" v-model="email" placeholder="Email" 
                        required>
                        <i class="bx bxs-user"></i>
                    </div>

                    <div class="input-box">
                        <input type="password" v-model="password" v-on:input="checkUser" placeholder="Password"  autocomplete="on" @input="checkPasswordCriteria"
                        required>
                    </div>

                    <div>
                        <ul class="no-bullets text-center mb-3" id="problems" style="font-size: small">
                            <li v-for="(problem, index) in problems" :key="index">{{ problem }}</li>
                        </ul>
                    </div>

                    <button @click="insertUser" class="btn">Sign Up</button>

                    <div class="register-link">
                        <p>Already have an account?
                            <a><router-link to="/sign-in">Sign In</router-link></a></p> <!-- Input sign up page reference -->
                    </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useRouter } from 'vue-router' // import router
import { doc, getFirestore, setDoc, collection, addDoc } from "firebase/firestore"; 


export default {
    data() {
        return {
            email: "",
            password: "",
            auth: getAuth(),
            db: getFirestore(),
            provider: new GoogleAuthProvider(),
            router: useRouter(),
            problems: [],
            isPasswordInvalid: true
        }
    },
    methods: {
        async insertUser() {
            if(this.checkPasswordCriteria() && this.isPasswordInvalid == false){
                try {
                    const { user } = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
                    const uid = user.uid;
                    console.log(uid);

                    const userDoc = doc(this.db, "Users", uid);
                    await setDoc(userDoc, {
                        username: this.email.split("@")[0],
                        bio: "Welcome to SustainablEats! This user has not set up a bio yet.",
                        uid: uid,
                        email: this.email,
                        coins: 30,
                        earned: 0,
                        profilepic: "https://firebasestorage.googleapis.com/v0/b/sustainableats-890e0.appspot.com/o/profilepic%2Fdefault.jpg?alt=media&token=6c103374-f754-4e32-8fd2-ee12f1d01fa5&_gl=1*ihndkn*_ga*MTQ1MjA2NDU4My4xNjk4NzM4NjE0*_ga_CW55HF8NVT*MTY5OTQyNDc3OC4zOS4xLjE2OTk0Mjc3MjYuMjQuMC4w",
                        profilebanner: "https://firebasestorage.googleapis.com/v0/b/sustainableats-890e0.appspot.com/o/banners%2Fdefault_banner.jpg?alt=media&token=c4232406-22cf-4960-a1bd-89b07c498e86&_gl=1*1057dx8*_ga*MTQ1MjA2NDU4My4xNjk4NzM4NjE0*_ga_CW55HF8NVT*MTY5OTQyNDc3OC4zOS4xLjE2OTk0Mjc2OTguNTIuMC4w",
                        posts: [],
                        bookmarks: []
                    });
                    await this.router.push('/home');
                } catch (error) {
                    this.router.push('/Register');
                }
            }
        },

        checkPasswordCriteria() {
            this.problems = []; // reset problems
            if (this.password.length < 8) {
                this.isPasswordInvalid = true;
                this.problems.push('Password must be at least 8 characters long.');
            }
            if (!/\d/.test(this.password)) {
                this.isPasswordInvalid = true;
                this.problems.push('Password must contain at least one digit.');
            }
            if (!/[a-z]/.test(this.password)) {
                this.isPasswordInvalid = true;
                this.problems.push('Password must contain at least one lowercase letter.');
            }
            if (!/[A-Z]/.test(this.password)) {
                this.isPasswordInvalid = true;
                this.problems.push('Password must contain at least one uppercase letter.');
            }
            if(this.problems.length == 0 && this.password != ""){
                this.isPasswordInvalid = false;
            }
            return true;
        },
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}
.no-bullets {
    list-style-type: none;
}

.background-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url(../assets/emerald.jpg) no-repeat; 
    background-size: cover;
    background-position: center;
}

.wrapper{
    width: 420px;
    background:transparent;
    border: 2px solid rgba(255,255,255,.3); 
    backdrop-filter: blur(15px); 
    color: white;
    border-radius: 10px;
    padding: 30px 40px;
}

.wrapper h1{
    font-size: 36px;
    text-align: center;
}

.wrapper .input-box{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.input-box input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255,255,255, .2);
    border-radius: 40px;
    font-size: 16px;
    color: white;
    padding: 20px 45px 20px 20px;
}

.input-box input:hover{
    background: black;
} 

.input-box input::placeholder{
    color: white;
}

.input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
}

.wrapper .btn{
    width: 100%;
    height: 45px;
    background: fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0,0,0, .3);
    cursor: pointer;
    font-size: 16px;
    color: white;
    font-weight: 600;
}

.btn:hover{
    background: black;
}

.wrapper .register-link{
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
}

.register-link p a {
    color: lightskyblue;
    text-decoration: none;
    font-weight: 600;
}

.register p a:hover{
    text-decoration: underline;
}

.wrapper .login-via{
    text-align: center;
    font-weight: 600;
}

.wrapper .login-via p {
    margin-top: 20px;
}

.social-icons{
    display: flex;
    width: 100%;
    padding-bottom: 5px;
}

.social-icon{
    display: flex;
    justify-content: space-between;
    width:150px;
    height:50px;
    margin:auto;
} 

.fa {
    padding: 11px;
    font-size: 30px;
    width: 35px;
    text-decoration: none;
    border-radius: 50%;
    cursor: pointer;
    margin-top: 10px;
    
  }

.fa:hover {
    opacity: 0.7;
  }

.fa-facebook {
    background: #3B5998;
    color: white;
  }

.fa-twitter {
    background: #55ACEE;
    color: white;
  }

.fa-google {
    background: #dd4b39;
    color: white;
  }

.match{
    margin-bottom: 15px;
    font-weight: 600;
    text-align:center;
}
</style>