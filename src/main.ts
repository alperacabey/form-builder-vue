import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { makeServer } from "./services/server";
import Toast from "vue-toastification";
import "./index.css";
import "vue-toastification/dist/index.css";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Toast)
  .mount("#app");
