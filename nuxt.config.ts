import postcssConfig from './postcss.config'

export default defineNuxtConfig({
  css: [
    '~/styles/tailwind.scss',
  ],

  postcss: postcssConfig,
})
