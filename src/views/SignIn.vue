<template>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> <!-- CDN to get box icons-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!--CDN to get social media buttons-->

    <div class = "background-container">
        <div class = "wrapper">
            <form v-on:submit.prevent ="validateUser">
                <h1>Login</h1>
                    <div class = "input-box">
                        <input type = "text" v-model = "email" placeholder = "Email" 
                        required>
                        <i class = "bx bxs-user"></i>
                    </div>

                    <div class = "input-box">
                        <input type = "password" v-model = "password" placeholder = "Password" 
                        required>
                        <i class = "bx bxs-lock-alt"></i>
                    </div>

                    <p v-if="errMsg" style = "color:red">{{ errMsg }}</p>

                    <button class = "btn" type = "submit">Login</button>

                    <div class = "register-link">
                        <p>Don't have an account?
                        <a><router-link to="/register">Register</router-link></a></p> <!-- Input sign up page reference -->
                    </div>

                    <div class = "login-via">
                        <hr><p>Login Via</p>
                    </div>

                    <div class="social-icons">
                        <div>
                            <span v-on:click="signInWithGoogle()" class="fa fa-google" style="display: inline-block; padding: 10px 20px; background-color: #4285F4; color: white; border-radius: 50px; text-align: center; width: auto; cursor: pointer;">Sign in with Google</span>
                        </div>
                    </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
    import { useRouter } from 'vue-router' // import router
    const email = ref("");
    const password = ref("");
    const errMsg = ref() // ERROR MESSAGE
    const router = useRouter() // get a reference to our vue router
    const provider = new GoogleAuthProvider();

    const validateUser = () => {
        // need value because ref()
        const auth = getAuth() // from firebase/auth
        signInWithEmailAndPassword (auth, email.value, password.value)
        .then((data) => {
            // Can retrieve user's (access token, email)
            const user = data.user;
            const uid = user.uid;
            
            console.log("Successfully signed!");
            console.log(auth.currentUser);
            router.push("/home"); //redirect to the explore page
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/user-not-found":
                    errMsg. value = "No account with that email was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password";
                    break;
                default:
                    errMsg. value = "Email or password was incorrect";
                    break;
            }
        });
    };

const signInWithGoogle = () => {
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console. log (result.user);
            router. push("/home");
        })
        .catch((error) => {

        });
};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
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