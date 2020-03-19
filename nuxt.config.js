const pkg = require('./package')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Environment variables
  */
  env: {
    figmaKey: process.env.FIGMA_KEY,
    apiUrl: process.env.API_URL
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Figma Extractor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'og:title', property: 'og:title', content: 'Figma Extractor' },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { hid: 'og:image', property: 'og:image', content: '' },
      { hid: 'og:url', property: 'og:url', content: '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fredoka+One&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
 css: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag'
  ],

  /*
  ** Plugins
  */
  plugins: [],

  /*
  ** Axios configuration
  */
  axios: {
    baseURL: process.env.API_URL
  },

  /*
  ** PWA configuration
  */
  pwa: {
    manifest: {
      name: 'Figma Extractor',
      short_name: 'Figma Extractor'
    },
    icons: {
      sizes: [16, 32, 180, 192, 512]
    }
  },

  /*
  ** GTAG configuration
  */
 'google-gtag': {
    id: process.env.GA,
    config: {
      send_page_view: true
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: process.env.NODE_ENV !== 'development',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend(config, ctx) {}
  }
}
