import { createRouter, createWebHistory } from "vue-router";
import Currency from "../views/Currency.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Currency,
    },
  ],
});

export default router;
