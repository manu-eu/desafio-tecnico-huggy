<template>
    <figure
        :style="{
            'background-image': `url(${props.imageSrc})`
        }"
        class="avatar"
    >
        {{ props.letters }}
    </figure>
</template>

<script setup lang="ts">
// const haha = 'https://static3.bigstockphoto.com/2/9/2/large1500/292115365.jpg';
export interface AvatarProps {
    imageSrc?: string,
    letters?: string,
}

const props = defineProps<AvatarProps>()

</script>

<style scoped lang="scss">
    .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;

        background-color: var(--persian-blue-10);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        display: flex;
        justify-content: center;
        align-items: center;

        color: var(--persian-blue-800);
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 500;
        letter-spacing: 0.1px;
    }
</style>