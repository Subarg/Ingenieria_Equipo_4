import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import router from "./Router";
import { createPinia } from "pinia";
import axios from "axios";
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
  faPencil,
  faTrashCan,
  faPlus,
  faXmark,
  faCheck,
  faFileLines,
  faCalendarCheck,
  faCartShopping,
  faMoneyCheckDollar,
  faBottleWater,
  faCaretLeft,
  faCaretDown,
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
  faPizzaSlice,
  faPencil,
  faTrashCan,
  faPlus,
  faXmark,
  faCheck,
  faFileLines,
  faCalendarCheck,
  faCartShopping,
  faMoneyCheckDollar,
  faBottleWater,
  faCaretLeft,
  faCaretDown
);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.config.globalProperties.$axios = axios;
app.mount("#app");
