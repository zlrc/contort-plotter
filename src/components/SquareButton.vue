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
    <button class="button" @contextmenu.prevent=""/>
</template>

<!---->

<style scoped lang="scss">
    .button {
        height: inherit;
        min-height: 1.75rem;
        aspect-ratio: 1/1;
        background: v-bind(color);
        border: solid 0.25rem v-bind(outline);
    }
</style>