import type { UserConfigExport, ConfigEnv, ProxyOptions } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import MarkDownPlugin from 'vite-plugin-vue-markdown'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_APP_PORT, VITE_APP_PROXY, VITE_MOCK } = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/] // <--
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
      MarkDownPlugin({
        markdownItSetup(md) {
          md.use(require('./build/toc.js'))
        }
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts']
    },
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: true
        }
      }
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
