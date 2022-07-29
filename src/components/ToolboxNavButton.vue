<script setup lang="ts">
import { SquareButton } from '@/components';

const emit = defineEmits<{
    /** Overridden click event that returns a component name as the destination */
    (e: 'click', destination: string): void
}>();

const props = defineProps<{
    /** Name of the page the button points to */
    to: string
    /** Name of the SVG icon */
    icon: string
}>();

function onClick() {
    emit('click', props.to);
}
</script>

<!---->

<template>
    <SquareButton class="Toolbox__nav-button" :icon="props.icon" @click="onClick"/>
</template>

<!---->

<style lang="scss" scoped>
.Toolbox__nav-button {
    height: $height-tray;
    width: $height-tray;
    margin: 1rem;

    background: $color-menu-button-bg;

    @media (max-width: 428px) {
        margin: 0.45rem;
    }
}
</style>