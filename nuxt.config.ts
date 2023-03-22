export default defineNuxtConfig({
  components: {
    dirs: [
      {path: '~/components/forms', pathPrefix: false},
    ],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
})
