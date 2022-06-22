import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/orders",
    name: "orders",
    component: () => import("./components/OrdersList")
  },
  {
    path: "/order/:id",
    name: "order-details",
    component: () => import("./components/Order")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddOrder")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;