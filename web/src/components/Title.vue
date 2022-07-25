<template>
    <h1
        :class="[props.variant || 'headline-1']"
    >
        <slot></slot>
    </h1>
</template>

<script setup lang="ts">
    export type TitleHeadline = 'headline-1' | 'headline-2'

    export interface TitleProps {
        variant: TitleHeadline;
    }

    const props = defineProps<TitleProps>();
</script>

<style scoped>
    .headline-1 {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 2rem;
        letter-spacing: 0;
        margin-bottom: 1.5rem;
    }

    .headline-2 {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.75rem;
        letter-spacing: 0.15px;
        margin-bottom: 1.125rem;
    }

</style>