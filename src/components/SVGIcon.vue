<script setup lang="ts">
import { ref } from "vue";

/* Props */
const props = defineProps<{
    /** Name of the SVG file under `src/icons/` (without extension). */
    name: string
}>();

/* Asynchronously load the SVG */
const icon = ref("");
import(`@/icons/${props.name}.svg?raw`).then(module => icon.value = module.default);
</script>

<!---->

<template>
    <div class="svg-icon" v-html="icon" />
</template>

<!---->

<style lang="scss">
.svg-icon {
    svg {
        height: 100%;
        width: 100%;
    }
}
</style>