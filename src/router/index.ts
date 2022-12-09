import { createWebHashHistory, createRouter } from "vue-router";
import CreateComponent from "../components/CreateComponent.vue";
import ListComponent from "../components/ListComponent.vue";
import EditComponent from "../components/EditComponent.vue";
import AccountComponent from "../components/AccountComponent.vue";
import Home from "../Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import store from "../store";
const routes = [
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/view",
    name: "view",
    component: ListComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "create",
    component: CreateComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditComponent,
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "account",
    component: AccountComponent,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const routeIsProtected = to.matched.some((item) => item.meta.requiresAuth);
  if (routeIsProtected && store.state.token === null) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
