import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as yup from 'yup'

import router from './services/router'
import locale from './locales/yup-pt_BR-locale'

import App from './App.vue'

import './styles/_main.scss'

yup.setLocale(locale)

createApp(App).use(router).use(createPinia()).mount('#app')
