// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  devServer: {
    port: 3001,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.min.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  app: {
    head: {
      title: 'Admin Webiste',
      titleTemplate: '%s  | RSUD Dr. Soetomo',

      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/rsds-icon.ico'
        }
      ],

      meta: [
        {
          name: 'description',
          content: 'Admin Website RSUD Dr. Soetomo'
        }
      ]
    }
  }
})
