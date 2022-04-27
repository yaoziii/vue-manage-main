import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import "./assets/scss/index.scss";
import { VueWindowSizePlugin } from "vue-window-size/option-api";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueWindowSizePlugin);

app.mount("#app");
