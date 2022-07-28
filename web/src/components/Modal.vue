<template>
    <Teleport to="body">
        <div class="modal">
            <div class="modal-content overflow-y hide-scrollbar" :class="[sizeClass]">
                <div v-if="hasHeader" class="modal-content-header headline-2">
                    <slot name="header"></slot>
                </div>
                <slot></slot>
                <div v-if="hasFooter" class="modal-content-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, useSlots } from 'vue';

interface ModalProps {
    size?: 'small' | 'large';
}

const props = defineProps<ModalProps>();

const sizeClass =computed(() => {
    if(props.size === 'small') {
        return 'small-size';
    }
    return 'large-size';
});

const slots = useSlots();

const hasHeader = computed(() => !!slots.header && slots.header().length > 0)
const hasBody = computed(() => !!slots.default && slots.default().length > 0)
const hasFooter = computed(() => !!slots.footer && slots.footer().length > 0)

onMounted(() => {
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.removeAttribute('style');
});

</script>

<style lang="scss">

</style>