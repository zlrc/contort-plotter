<script setup lang="ts">
const props = defineProps<{
    /** @default white */
    fillColor?: string
    /** @default black */
    outlineColor?: string
    /** @default 1.75rem */
    size?: string;
}>();

const size = props.size ? props.size : "1.75rem";
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
        height: v-bind(size);
        width: v-bind(size);

        min-height: 1.75rem;
        min-width: 1.75rem;
        
        background: v-bind(color);
        border: solid 0.25rem v-bind(outline);
    }
</style>