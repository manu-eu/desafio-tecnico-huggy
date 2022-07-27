import { createApp } from 'vue'
import * as yup from 'yup'

import router from './router'
import locale from './langs/validations'

import App from './App.vue'

import './styles/_main.scss'

yup.setLocale(locale)

createApp(App).use(router).mount('#app')
