// https://github.com/vuesax-alpha/vuesax-alpha

import { defineNuxtPlugin } from '#app'
import Vuesax from 'vuesax-alpha'
import 'vuesax-alpha/theme-chalk/index.css'
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Vuesax)
})
