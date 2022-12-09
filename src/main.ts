import { createApp } from "vue";
import Home from "./HomeComponent.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";
import "bootstrap";
import router from "./router";
import store from "./store";

createApp(Home).use(router).use(store).mount("#app");
