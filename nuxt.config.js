import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | タビシヨ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'タビシヨは、旅のしおりを投稿して、皆さんの考える旅のプランをユーザーに共有することができる、まったく新しいタイプのウェブサービスです。'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: 'タビシヨ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://tabishiyo.com' },
      { hid: 'og:title', property: 'og:title', content: 'タビシヨ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'タビシヨは、旅のしおりを投稿して、皆さんの考える旅のプランをユーザーに共有することができる、まったく新しいタイプのウェブサービスです。'
      },
      { hid: 'og:image', property: 'og:image', content: 'https://tabishiyo.com/icons/carry-on-colour.svg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700&display=swap'
      }
    ]
  },

  /*
   ** Environment variables
   */
  env: {
    BASE_URL: process.env.NUXT_ENV_BASE_URL || 'http://localhost:3000'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/app.styl', '@/assets/app.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/axios', '@/plugins/vee-validate'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/moment', { locales: ['ja'], defaultLocale: 'ja' }],
    'nuxt-clipboard2'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.NUXT_ENV_API_BASE_URL || 'http://localhost:4000'
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
