import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/",
    component: () => import("../views/editor/index.vue"),
  },
  {
    path: "/editor/:id",
    component: () => import("../views/editor/index.vue"),
  },
  {
    path: "/view/:id",
    component: () => import("../views/view/index.vue"),
  },
  {
    path: "/demo",
    component: () => import("../views/demo.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),//createWebHistory(),
  routes,
});

export default router;
