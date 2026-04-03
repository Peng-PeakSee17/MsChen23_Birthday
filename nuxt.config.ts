// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  ssr: false,
  
  nitro: {
    preset: 'vercel'
  },

  runtimeConfig: {
    dbPath: './data/novel.db',
    jwtSecret: 'your-secret-key-change-in-production'
  }
})