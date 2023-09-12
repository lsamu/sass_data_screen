import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"]
    }),
  ],
  resolve:{
    alias:[
      {
        find: '@',                                   // 别名
        replacement: resolve(__dirname, './src'),   
      },
      {
        find: '@@',                                   // 别名
        replacement: resolve(__dirname, '../../sass_data_model/web_lowcode/src'),      // 别名对应地址
      }
    ]
  },
  build:{
    emptyOutDir:true,
  },
  server: {
    port: 8081,
  }
})
