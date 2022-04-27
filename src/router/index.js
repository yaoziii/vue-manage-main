import { createRouter, createWebHistory } from "vue-router";
// import OrderView from "../views/OrderView.vue";

const routes = [
  {
    path: "/redirect",
    component: () => import("@/layout/index"),
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/index"),
    redirect: "/orderView",
    children: [
      {
        path: "orderView",
        component: () => import("@/views/orderView/index"),
        name: "orderView",
        meta: { title: "orderView", icon: "order", affix: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
