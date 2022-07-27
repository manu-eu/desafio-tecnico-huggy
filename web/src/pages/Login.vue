<script setup lang="ts">
import { useRouter } from 'vue-router';

import Button from '../components/Button.vue';

const router = useRouter();

const goToContact = () => {
    router.push({ name: 'Contacts' });
};

</script>

<template>
    <div class="login-wrapper">
        <h1 class="headline-1">Login</h1>
        <Button @click="goToContact()" title="Fazer login com a Huggy"/>
    </div>
</template>

<style scoped>

</style>