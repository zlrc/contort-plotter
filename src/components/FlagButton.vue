<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SVGIcon } from '@/components';
import { contrastStr } from '@/utils/colors';

const props = defineProps<{
    /** @default white */
    fillColor?: string
    /** @default black */
    outlineColor?: string
    /** Name of the SVG icon to use */
    icon?: string;
}>();

// Props
const color = props.fillColor ? props.fillColor : "white";
const outline = props.outlineColor ? props.outlineColor : "black";

// References
const iconColor = ref<string>("");
const pathBG = ref<HTMLElement>();

onMounted(() => {
    if (props.icon)
        iconColor.value = contrastStr(getComputedStyle(pathBG.value as HTMLElement).fill);
});
</script>

<!---->

<template>
    <button class="button" @contextmenu.prevent="">
        <SVGIcon class="button__icon" v-if="props.icon && iconColor" :name="props.icon" :color="iconColor" />
        <svg viewBox="0 0 140 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref="pathBG" id="path-bg" d="M1 68V1H103.086L136.586 34.5L103.086 68H34.5H1Z" />
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