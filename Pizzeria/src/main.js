import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import router from "./Router";
import { createPinia } from "pinia";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faChartBar,
  faEye,
  faEyeSlash,
  faBars,
  faTimes,
  faCircleUser,
  faUserTie,
  faCashRegister,
  faBox,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faChartBar,
  faEye,
  faEyeSlash,
  faBars,
  faTimes,
  faCircleUser,
  faUserTie,
  faCashRegister,
  faBox,
  faPizzaSlice
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
