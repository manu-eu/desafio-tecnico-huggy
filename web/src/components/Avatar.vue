<script setup lang="ts">
    import { computed } from 'vue';

    export interface AvatarProps {
        imageSrc?: string,
        name: string,
    }

    const props = defineProps<AvatarProps>()

    const initials = computed(() => {
        if(props.imageSrc && props.imageSrc.length > 0) {
            return ''
        }

        const names = props.name.trim().split(' ')
        const initials = names.map(name => name[0]).join('')

        return initials.substring(0, 2);
    })
</script>

<template>
    <figure
        :style="{
            'background-image': `url(${props.imageSrc})`
        }"
        class="avatar"
    >
        {{ initials }}
    </figure>
</template>

<style scoped>

</style>