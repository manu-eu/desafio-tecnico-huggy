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

<template>
    <button
        class="button button-text"
        :class="[props.color || 'primary']"
    >
        <Icon class="button-icon" v-if="props.icon" :icon="props.icon"/>
        {{props.title}}
        <slot></slot>
    </button>
</template>

<style scoped>

</style>