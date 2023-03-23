export default defineNuxtConfig({
  components: {
    dirs: [
      {path: '~/components/forms', pathPrefix: false},
    ],
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
})
