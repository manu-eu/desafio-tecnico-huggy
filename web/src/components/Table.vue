<template>
    <table class="table">
        <thead class="caption">
            <th v-for="header in props.headers">
                <span class="cursor-pointer">{{ header }} <icon class="sort-icon" icon="south" /></span>
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
    headers: string[];
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

export interface TableEvents {
    (e: 'sort', sortDefinition: {name: string, direction: 'asc' | 'desc'}): void;
}

const props = defineProps<TableProps>()
const emit = defineEmits<TableEvents>()

// const state = reactive({
//     sortBy: props.sortBy || (props.headers [0]).name,
//     sortDirection: props.sortDirection || 'desc',
// });

// const updateSort = (header: TableHeaderDefinition) => {
//     if (header.sortable === false) {
//         return;
//     } else if (state.sortBy === header.name) {
//         state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//         state.sortBy = header.name;
//         state.sortDirection = 'desc';
//     }
// }

// watch(state, (newState) => {
//     emit('sort', {
//         name: newState.sortBy,
//         direction: newState.sortDirection,
//     });
// })

</script>

<style lang="scss">

</style>