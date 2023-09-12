import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 导入 icon
import * as ElIconList from '@element-plus/icons-vue'

//big
import BoxBig from "./components/big/index";
import OptionBoxBig from "./components/big/option";

//Vue3DraggableResizable
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

// pinia
import pinia from "./store/pinia";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small" });
// 注册icon
for (const name in ElIconList) {
    app.component(name, ElIconList[name])
  }
app.use(BoxBig);
app.use(OptionBoxBig);
app.use(Vue3DraggableResizable);
app.use(pinia)
app.mount("#app");