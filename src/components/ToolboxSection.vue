<script setup lang="ts">
const props = defineProps<{
    /** The section's header text. */
    title?: string
}>();
</script>

<!---->

<template>
    <div class="Toolbox__section">
        <h3 v-if="props.title">{{props.title}}</h3>
        <slot />
    </div>
</template>

<!---->

<style lang="scss"></style>