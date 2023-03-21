import type { UserConfigExport, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_APP_PORT, VITE_APP_PROXY, VITE_MOCK } = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue({
        include: [/\.vue$/] // <--
      }),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        supportTs: true, //如果使用 js发开，则需要配置 supportTs 为 false
        logger: true,
        localEnabled: command === 'serve',
        prodEnabled: VITE_MOCK === 'true',
        injectCode: `
        import { setupProdMockServer } from '../mock/mockProdServer';
        setupProdMockServer();
      `
      }),
      AutoImport({
        imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts']
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/css/index.less')}";`
          },
          javascriptEnabled: true
        }
      },
      modules: {
        localsConvention: 'camelCase'
      }
    }
  }
}
