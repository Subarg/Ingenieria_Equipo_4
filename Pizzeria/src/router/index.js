import { createRouter, createWebHistory } from "vue-router";
import login from "../modules/login/views/login.vue";

const routes = [
  { path: "/", name: "login", component: login },
  {
    path: "/registro",
    name: "registro",
    component: () => import("../modules/login/views/registroUsuario.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../layouts/layoutAdmin.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../components/home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
