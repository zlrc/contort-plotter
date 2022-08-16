<script setup lang="ts">
import { SVGIcon } from '@/components';

const props = defineProps<{
    /** @default white */
    fillColor?: string
    /** @default black */
    outlineColor?: string
    /** @default 1.75rem */
    size?: string;
    /** Name of the SVG icon use */
    icon?: string;
}>();

const size = props.size ? props.size : "1.75rem";
const color = props.fillColor ? props.fillColor : "white";
const outline = props.outlineColor ? props.outlineColor : "black";
</script>

<!---->

<template>
    <button class="button" @contextmenu.prevent="">
        <SVGIcon class="button__icon" v-if="props.icon" :name="props.icon" aria-hidden="true" />
        <slot/>
    </button>
</template>

<!---->

<style scoped lang="scss">
    $transition-padding: $transition-padding-button;

    .button {
        height: v-bind(size);
        width: v-bind(size);

        min-height: 1.75rem;
        min-width: 1.75rem;
        
        background: v-bind(color);
        border: solid 0.25rem v-bind(outline);

        transition: $transition-padding;
        &:active, &:focus {
            padding: 0.25rem;
        }
    }

    .button__icon {
        pointer-events: none;
    }
</style>