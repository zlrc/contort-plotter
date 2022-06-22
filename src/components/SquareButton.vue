<script setup lang="ts">
const props = defineProps<{
    color?: string
}>();

const color = props.color ? props.color : "white";
</script>

<!---->

<template>
    <button class="button" @contextmenu.prevent=""/>
</template>

<!---->

<style scoped lang="scss">
    .button {
        height: 100%;
        aspect-ratio: 1/1;
        background: v-bind(color);
        border: solid 0.25rem black;
    }
</style>