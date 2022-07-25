import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from '@/pages/Login.vue'
import Contacts from '@/pages/Contacts.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router