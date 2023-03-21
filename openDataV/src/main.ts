import App from './App.vue'
import '@/css/tailwind.css'
import '@/css/index.less'
import '@/css/font.less'
import '@/assets/directionFonts/iconfont.css'
import store from '@/store'
import { AsyncComponent } from '@/designer/load'
import router from '@/router'
import Directive from '@/plugins/directive'
import XIcon from '@/plugins/xicon'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(Directive)
app.use(XIcon)

app.use(AsyncComponent)

app.use(ElementPlus)

// 注册状态管理器
app.use(store)

// 注册路由模块
app.use(router)

app.mount('#app', true)
