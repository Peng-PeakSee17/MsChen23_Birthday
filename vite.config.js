import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AutoImport } from 'unplugin-auto-import/vite'
import { vantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [vantResolver()],
    }),
    AutoImport({
      resolvers: [vantResolver()],
    }),
  ],
})
