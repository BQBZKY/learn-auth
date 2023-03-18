import postcssConfig from './postcss.config'

export default defineNuxtConfig({
  css: [
    '~/styles/tailwind.scss',
  ],

  postcss: postcssConfig,

  components: {
    dirs: [
      {path: '~/components/formFields', pathPrefix: false},
    ],
  },

  experimental: {
    reactivityTransform: true,
  },

  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
  ],
})
