<script lang="ts">
    import { defineComponent, computed } from 'vue'

    export default defineComponent({
        setup: (props, { slots }) => {
            const hasHeader = computed(() => !!(slots.header) && (slots.header().length > 0));
            return { hasHeader }
        }
    })
</script>
<template>
    <section class="box">
        <header v-if="hasHeader" class="box-header">
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
    </section>
</template>
<style scoped>
    .box {
        width: 100%;
        min-height: calc(100vh - 4rem - 1.75rem);
        background: #ffffff;
        border: 1px solid var(--mine-shaft-30);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        border-radius: 1rem;
        padding: 1rem;
    }

    .box .box-header {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>