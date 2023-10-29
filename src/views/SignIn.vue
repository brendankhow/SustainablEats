<template>
  <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Login</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    <p><button><router-link to="/register">Register</router-link></button></p>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router' // import router
    const email = ref("");
    const password = ref("");
    const errMsg = ref() // ERROR MESSAGE
    const router = useRouter() // get a reference to our vue router

    const register = () => {
        // need value because ref()
        const auth = getAuth() // from firebase/auth
        signInWithEmailAndPassword (auth, email.value, password.value)
        .then((data) => {
            const user = data.user;
            const uid = user.uid;

            console.log("Successfully signed!");
            console. log(auth. currentUser);
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

const signInWithGoogle = () =>{};
</script>

<style>

</style>