import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginComponent from "../components/LoginComponent.vue";
import RegistrationComponent from "../components/RegistrationComponent.vue";
import Courses from "../views/Courses.vue"; // Import the Courses component

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login", // Redirect to login page initially
  },
  {
    path: "/login",
    name: "Login",
    component: LoginComponent,
    meta: { requiresLogin: false }, // Set requiresLogin to false for the login route
  },
  {
    path: "/register",
    name: "Register",
    component: RegistrationComponent,
    meta: { requiresLogin: false }, // Set requiresLogin to false for the registration route
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresLogin: true }, // Set requiresLogin to true for routes that require login
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses, // Assign the Courses component to the /courses route
    meta: { requiresLogin: true }, // Set requiresLogin to true for routes that require login
  },
  {
    path: "/course/view/",
    name: "View Course",
    component: () =>
      import(
        /* webpackChunkName: "viewCourse" */ "../views/ViewCoursePage.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
  const isAuthenticated = localStorage.getItem("currentUser"); // Change to "currentUser"
  if (requiresLogin && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
