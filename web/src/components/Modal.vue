<template>
    <Teleport to="body">
        <div class="modal">
            <div class="modal-content">
                <div v-if="hasHeader" class="modal-content-header">
                    <slot name="header"></slot>
                </div>
                <div v-if="hasBody" class="modal-content-body">
                    <slot></slot>
                </div>
                <div v-if="hasFooter" class="modal-content-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, useSlots } from 'vue';

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
    .modal {
        background: rgba(0, 0, 0, 0.35);
        height: 100vh;
        width: 100vw;

        animation: modal-fade 200ms ease-out forwards;

        @keyframes modal-fade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        position: fixed;
        top: 0;
        left: 0;

        .modal-content {
            animation: modal-slide-up 200ms ease-out forwards;
            @keyframes modal-slide-up {
                from {
                    transform: translate(-50%, -60%);
                }
                to {
                    transform: translate(-50%, -50%);
                }
            }

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            /* width: min(90%, 610px); */
            background: #ffffff;
            border-radius: 0.75rem;

            .large {
                width: min(95%, 610px);
            }

            .small {
                width: min(95%, 360px);
            }



            .modal-content-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--mine-shaft-30);
            }

            .modal-content-body {
                /* padding: 1.5rem; */
            }

            .modal-content-footer {
                border-top: 1px solid var(--mine-shaft-30);
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 0.5rem;
            }

        }
    }
</style>