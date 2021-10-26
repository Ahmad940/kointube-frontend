import colors from 'vuetify/es5/util/colors'
import pkg from './package.json'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kointube',
    title: 'KoinTube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: 'RPC1Tvb96ielLl9N8Vtf3vhbnPTEztGVCFENbXRjjeg',
      },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:url', content: 'https://kointube.herokuapp.com' },
      { property: 'og:type', content: 'streaming' },
      { property: 'og:title', content: 'Kointube' },
      { property: 'og:description', content: pkg.description },
      { property: 'og:image', content: '/logolight.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/capitalize.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // loading bar
  loading: {
    color: '#fff',
    throttle: 0,
  },

  // global router config
  router: {
    // Run the middleware/user-agent.js on every page
    middleware: 'auth',
  },

  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:5000/api',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'advancedFormat'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
  },

  // Auth modul configuration: https://auth.nuxtjs.org/
  auth: {
    // Options
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/profile', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: `/`,
      home: '/',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.purple,
          accent: colors.grey.lighten4,
          secondary: '#FB740E',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.purple,
          secondary: '#FB740E',
          accent: colors.grey.lighten4,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['lodash-es'],
    // Other build options
  },
}
