<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '../components/Button.vue';
import Title from '../components/Title.vue';

const router = useRouter();

const goToContact = () => {
    router.push({ name: 'Contacts' });
};

</script>

<template>
    <div class="login">
        <Title variant="headline-1">Login</Title>
        <Button @click="goToContact()" title="Fazer login com a Huggy"/>
    </div>
</template>

<style scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 4rem);
    }
</style>