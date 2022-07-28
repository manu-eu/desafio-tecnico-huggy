import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from '@/pages/Login.vue'
import Contacts from '@/pages/Contacts.vue'
import { useAuthStore } from '../stores';

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
    },
    {
        path: '/:catchAll(.*)',
        redirect: to => {
            return { name: 'Login' }
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const publicPages = ['Login'];

router.beforeEach(async (to) => {
    const needsAuthentication = !publicPages.includes(to.name as string);
    const auth = useAuthStore();
    const isLoggedIn = await auth.isLoggedIn();

    if (needsAuthentication && !isLoggedIn) {
        router.push({ name: 'Login' });
    }

    if (to.name === 'Login' && isLoggedIn) {
        router.push({ name: 'Contacts' });
    }
});

export default router