<template>
    <table class="table">
        <thead class="table-header">
            <th v-for="header in props.headers">
                <div @click="updateSort(header)" class="table-header-cell">
                    {{ header.label }}
                    <Icon
                        v-if="state.sortBy === header.name && header.sortable !== false"
                        class="table-order-icon"
                        :icon="state.sortDirection === 'asc' ? 'north' : 'south'"
                    />
                </div>
            </th>
        </thead>
        <tbody class="table-body">
            <slot></slot>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

import Icon from './Icon.vue';

export interface TableHeaderDefinition {
    label: string;
    name: string;
    sortable?: boolean;
}

export interface TableProps {
    headers: TableHeaderDefinition[];
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

export interface TableEvents {
    (e: 'sort', sortDefinition: {name: string, direction: 'asc' | 'desc'}): void;
}

const props = defineProps<TableProps>()
const emit = defineEmits<TableEvents>()

const state = reactive({
    sortBy: props.sortBy || (props.headers [0]).name,
    sortDirection: props.sortDirection || 'desc',
});

const updateSort = (header: TableHeaderDefinition) => {
    if (header.sortable === false) {
        return;
    } else if (state.sortBy === header.name) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortBy = header.name;
        state.sortDirection = 'desc';
    }
}

watch(state, (newState) => {
    emit('sort', {
        name: newState.sortBy,
        direction: newState.sortDirection,
    });
})

</script>

<style lang="scss">
.table {
    width: 100%;
    padding: 0 0.5rem;

    border-collapse: separate;
    border-spacing: 0 0.25rem;

    .table-header {
        color: var(--mine-shaft-400);
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.4px;
        line-height: 1rem;

        th {
            text-align: start;
            border-bottom: 1px solid var(--mine-shaft-30);

            padding: 0.875rem 0;

            &:first-child {
                padding-left: 1rem;
            }

            &:last-child {
                padding-right: 1rem;
            }

            .table-header-cell {
                display: flex;
                align-items: center;
                cursor: pointer;
                width: fit-content;
                .table-order-icon {
                    margin-left: 0.25rem;
                    height: 1rem;
                    width: 1rem;
                    fill: var(--mine-shaft-400);
                }
            }
        }
    }

    .table-body {
        color: var(--mine-shaft-700);
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0.25px;
        line-height: 1.125rem;

        tr {
            transition: background-color 200ms ease-out;
            outline: none;
            cursor: pointer;

            &:focus {
                background: var(--mine-shaft-10);
            }

            td {
                padding: 0.5rem 0;

                &:first-child {
                    padding-left: 1rem;
                    border-radius: 0.5rem 0 0 0.5rem;

                }

                &:last-child {
                    padding-right: 1rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
            }

            .table-actions {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row-reverse;

                .action-button {
                    cursor: pointer;
                    padding: 0;
                    margin: none;
                    border: none;
                    outline: none;
                    background: none;
                    background: transparent;

                    transition: transform 100ms ease-out, opacity 100ms ease-out;
                    opacity: 0;

                    & ~ .action-button {
                        margin-right: 0.5rem;
                    }

                    @for $i from 1 through 10 {
                        &:nth-child(#{$i}n) {
                            transition-delay: #{$i * 10}ms;
                            transform: translateX(#{(($i - 1) * 8) + 2}px);
                        }
                    }

                    svg {
                        fill: var(--mine-shaft-400);
                        height: 1.125rem;
                        width: 1.125rem;
                    }
                }
            }

            &:focus .table-actions .action-button,
            &:hover .table-actions .action-button {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
}
</style>