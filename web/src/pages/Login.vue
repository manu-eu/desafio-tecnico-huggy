<script setup lang="ts">
import VButton from '../components/Button.vue';

</script>

<template>
    <div class="login">
        <h1 class="headline-1">Login</h1>
        <v-button title="Fazer login com a Huggy"/>
    </div>
</template>

<style scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
    }

    .login h1 ~ .button {
        margin-top: 1rem;
    }
</style>