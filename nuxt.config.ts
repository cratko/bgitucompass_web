import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  routeRules: {
    '/': { prerender: true },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/image',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
      script: [
        {
          src: "/js/telegram-web-app.js",
          compilerOptions: {
            isCustomElement: (tag) => ['v-date-input'].includes(tag),
          }
        },
      ],
    },
  }
});
