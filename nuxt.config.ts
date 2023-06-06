// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // appearance config {vuetify}
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
    build: {
        transpile: ['vuetify'],
    },

    // pinia config
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically import `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    ['defineStore', 'definePiniaStore'] 
                ]
            }
        ],
        '@nuxtjs/supabase'
    ],

    // setup env variables
    runtimeConfig: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY
    }
})
