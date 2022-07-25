<template>
    <button
        class="button"
        :class="[props.color || 'primary']"
    >
        <icon class="icon" v-if="props.icon" :icon="props.icon"/>
        {{props.title}}
    </button>
</template>
<script setup lang="ts">
import Icon, { IconType } from './Icon.vue';
    type ButtonColors = 'primary' | 'secondary' | 'danger'

    interface ButtonProps {
        color?: ButtonColors;
        icon?: IconType;
        title?: string;
    }

    const props = defineProps<ButtonProps>();
</script>
<style scoped>
    .icon {
        margin-right: 0.5rem;
    }
</style>