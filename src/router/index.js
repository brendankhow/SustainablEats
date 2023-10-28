import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import HomeView from '../views/HomeView.vue'
import Home from "@/views/Home.vue"; // Adjust the import path as needed

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "", component: () => import("../views/SignIn.vue") }, // Default route
    { path: "/home", component: () => import("../views/Home.vue") },
    { path: "/register", component: () => import("../views/Register.vue") },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
    { path: "/createRecipe", component: () => import("../views/createRecipe.vue") },
    { path: "/generateRecipe", component: () => import("../views/generateRecipe.vue") },
    { 
      path: "/explore", 
      component: () => import("../views/Explore.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged (
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};


router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()) {
      next();
  } else {
    alert ("you dont have access!");
    next ("/");
  } 
  } else {
    next ();
  }
}) ;

export default router
