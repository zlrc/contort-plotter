<script setup lang="ts">
const props = defineProps<{
    fillColor?: string
    outlineColor?: string
}>();

const color = props.fillColor ? props.fillColor : "white";
const outline = props.outlineColor ? props.outlineColor : "black";
</script>

<!---->

<template>
    <button class="button" @contextmenu.prevent="">
        <svg viewBox="0 0 140 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="path-bg" d="M1 68V1H103.086L136.586 34.5L103.086 68H34.5H1Z" />
        </svg>
    </button>
</template>

<!---->

<style scoped lang="scss">
    .button {
        height: 100%;
        background: none;
        border: none;

        svg {
            height: 100%;
        }
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