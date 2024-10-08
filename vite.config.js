import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vueApp',
      filename: './dist/assets/remoteEntry.js',
      exposes: {
        './App': './src/App.vue' // Убедитесь, что путь корректен
      },
      shared: ['vue'],
      remotes: {},
      globalName: 'vueApp'
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: './src/main.js', // Убедитесь, что у вас есть точка входа
      name: 'vueApp',
      fileName: 'remoteEntry'
    }
  }
})
