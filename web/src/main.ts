import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from 'element-plus/es/locale/lang/zh-cn'

// 导入 icon
import * as ElIconList from '@element-plus/icons-vue'

//system
import SystemUI from "@@/components/system/index";

//echart
import BoxEChart from "./components/echart/index";
import OptionBoxEChart from "./components/echart/option";
import VisualBoxEChart from "./components/echart/visual";

// datav
import DataVVue3 from '@kjgl77/datav-vue3'

//Vue3DraggableResizable
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

// pinia
import pinia from "./store/pinia";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { size: "small", locale });
// 注册icon
for (const name in ElIconList) {
  app.component(name, ElIconList[name])
}
app.use(SystemUI)
app.use(BoxEChart);
app.use(OptionBoxEChart);
app.use(VisualBoxEChart);
app.use(DataVVue3);
app.use(Vue3DraggableResizable);
app.use(pinia)
app.mount("#app");