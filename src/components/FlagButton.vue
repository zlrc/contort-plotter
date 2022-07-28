<script setup lang="ts">
import { SVGIcon } from '@/components';

const props = defineProps<{
    /** @default white */
    fillColor?: string
    /** @default black */
    outlineColor?: string
    /** Name of the SVG icon to use */
    icon?: string;
}>();

const color = props.fillColor ? props.fillColor : "white";
const outline = props.outlineColor ? props.outlineColor : "black";
</script>

<!---->

<template>
    <button class="button" @contextmenu.prevent="">
        <SVGIcon class="button__icon" v-if="props.icon" :name="props.icon" />
        <svg viewBox="0 0 140 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="path-bg" d="M1 68V1H103.086L136.586 34.5L103.086 68H34.5H1Z" />
        </svg>
    </button>
</template>

<!---->

<style scoped lang="scss">
    .button {
        position: relative;
        height: 100%;
        background: none;
        border: none;

        svg {
            height: 100%;
        }
    }

    .button__icon {
        position: absolute;
        height: 100%;
        width: 45%;
        margin: 0 2.5rem;
        padding: 0.25rem;
        pointer-events: none;
    }

    #path-bg {
        $color: v-bind(color);
        fill: v-bind(color);
        stroke: v-bind(outline);
        stroke-width: 0.25rem;
        stroke-linejoin: miter;

        transition: filter 0.1s ease-in-out;
        &:active {
            filter: brightness(70%);
        }
    }
</style>