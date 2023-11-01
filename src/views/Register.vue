<template>
    <!--
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p> -->

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class = "background-container">
        <div class = "wrapper">
            <form v-on:submit.prevent = "insertUser">
                <h1>Sign Up</h1>
                    <div class = "input-box">
                        <input type = "text" v-model = "email" placeholder = "Email" 
                        required>
                        <i class = "bx bxs-user"></i>
                    </div>

                    <div class = "input-box">
                        <input type = "password" v-model = "password" v-on:input= "checkUser" placeholder = "Password" 
                        required>
                        <i class = "bx bxs-lock-alt"></i>
                    </div>

                    <!--
                    <div class = "input-box">
                        <input type = "password" v-model = "confirmPassword" v-on:input = "checkUser" placeholder = "Confirm Password" 
                        required>
                        <i class = "bx bxs-lock-alt"></i>
                    </div> 

                    <div class = "match">{{match}}</div> -->

                    <button type = "submit" class = "btn">Sign Up</button>

                    <div class = "register-link">
                        <p>Already have an account?
                            <a><router-link to="/sign-in">Sign In</router-link></a></p> <!-- Input sign up page reference -->
                    </div>

                    <div class = "login-via">
                        <hr><p>Login Via</p>
                    </div>
            </form>
            <div class = "social-icons">
                <div class = "social-icon">
                    <a href = "#" class = "fa fa-facebook"></a>
                    <span class = "fa fa-twitter"></span>
                    <span class = "fa fa-google" @click="signInWithGoogle"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
    import { useRouter } from 'vue-router' // import router
    import { doc, getFirestore, setDoc } from "firebase/firestore"; 
    import { collection, addDoc } from "firebase/firestore"; 

    
    const email = ref("");
    const password = ref("");
    const router = useRouter() // get a reference to our vue router
    const auth = getAuth();
    const db = getFirestore();
    
    const provider = new GoogleAuthProvider();

    const insertUser = async () => {
    try {
        const { user } = await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
        const uid = user.uid;

        // Specify the document ID as the user's UID
        const userDoc = doc(db, "Users", uid);

        await setDoc(userDoc, {
            username: email.value.split("@")[0],
            bio: "Welcome to SustainablEats! This user has not set up a bio yet.",
            uid: uid,
            email: email.value,
            coins: 30,
            earned: 0,
            profilepic: "https://firebasestorage.googleapis.com/v0/b/sustainableats-11dde.appspot.com/o/profilepictures%2Fmath_cat.jpg?alt=media&token=89034238-10c7-4da7-aa7f-05d4cfa1f477&_gl=1*5exyos*_ga*MTQ1MjA2NDU4My4xNjk4NzM4NjE0*_ga_CW55HF8NVT*MTY5ODgyMzcyMC43LjEuMTY5ODgyNDIyNS41Ny4wLjA.",
            profilebanner: "https://firebasestorage.googleapis.com/v0/b/sustainableats-11dde.appspot.com/o/profilebanners%2Fbanner.jpg?alt=media&token=00d33929-b0fc-44b8-ae5c-19778a816e6c&_gl=1*c69kay*_ga*MTQ1MjA2NDU4My4xNjk4NzM4NjE0*_ga_CW55HF8NVT*MTY5ODgyMzcyMC43LjEuMTY5ODgyMzkxMC40NS4wLjA.",
            posts: [],
            bookmarks: []
        });
        console.log("Successfully registered!");
        await router.push('/home'); // redirect to the feed
    } catch (error) {
        alert("Registration Failed! Please Try Again!");
        router.push('/Register');
    }
};

    const signInWithGoogle = () => {
        signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log (result.user);
                router.push("/home");
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
    background: url(../assets/dog_toast.jpg) no-repeat; 
    background-size: cover;
    background-position: center;
}

.wrapper{
    width: 420px;
    background:transparent;
    /*border: 2px solid rgba(255,255,255,.2); */
    backdrop-filter: blur(15px); 
    color: fff;
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
    color: black;
    padding: 20px 45px 20px 20px;
}

.input-box input:hover{
    background: white;
}

.input-box input::placeholder{
    color: black;
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
    box-shadow: 0 0 10px rgba(0,0,0, .1);
    cursor: pointer;
    font-size: 16px;
    color: 333;
    font-weight: 600;
}

.wrapper .register-link{
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
}

.register-link p a {
    color: fff;
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