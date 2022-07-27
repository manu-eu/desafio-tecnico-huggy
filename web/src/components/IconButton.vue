<script setup lang="ts">
    import Icon, { IconType } from './Icon.vue';

    interface ButtonProps {
        icon?: IconType;
    }

    const props = defineProps<ButtonProps>();
</script>

<template>
    <button class="button icon-button">
        <Icon class="icon" v-if="props.icon" :icon="props.icon"/>
    </button>
</template>

<style scoped>

</style>