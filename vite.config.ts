/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-06-21 15:58:08
 * @LastEditTime: 2022-06-28 08:39:17
 * @LastEditors: shuliang
 */
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import uni from '@dcloudio/vite-plugin-uni'
// import { viteExternalsPlugin } from 'vite-plugin-externals'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('./src/'),
}

const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  const localEnabled: boolean = (env.VITE_USE_MOCK as unknown as boolean) || false
  const prodEnabled: boolean = (env.USE_CHUNK_MOCK as unknown as boolean) || false
  return {
    plugins: [
      uni(),
      viteMockServe({
        // ↓解析根目录下的mock文件夹
        mockPath: 'mock',
        localEnabled: localEnabled, // 开发打包开关
        prodEnabled: prodEnabled, // 生产打包开关
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改
      }),
      // viteExternalsPlugin({
      //   vue: 'Vue',
      // }),
    ],
    root: process.cwd(),
    resolve: { alias },
    base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN,
      proxy: {
        [env.VITE_BASE]: {
          target: 'https://gitee.com',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(env.VITE_BASE, 'g'), '/'),
        },
      },
    },
    build: {
      outDir: 'dist',
      minify: 'terser',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            echarts: ['echarts'],
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        ie8: true,
        output: {
          comments: true,
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
  }
})

export default viteConfig
