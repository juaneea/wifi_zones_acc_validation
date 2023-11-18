import { createRouter, createWebHistory } from "vue-router";
import EmailValidation from "@/views/EmailValidation.vue";

const routes = [
  {
    path: "/",
    name: "EmailValidation",
    component: EmailValidation,
  },
  {
    path: "/reinicio",
    name: "ResetPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
