<script setup lang="ts">
const props = defineProps<{
    /** Passed through v-model */
    modelValue?: string
    /** @default blank */
    placeholder?: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();
</script>

<!---->

<template>
    <input id="textbox" type="text" :value="modelValue" :placeholder="props.placeholder" 
        @input="e => emit('update:modelValue', (e.target as HTMLInputElement).value)" />
</template>

<!---->

<style scoped lang="scss">
$border-radius: $border-radius-global;
$border-width: $border-width-global;

$color-border: $color-border-global;
$color-background: $palette-white;
$color-text: $palette-black;

$font-family: $font-stack-expr;
$font-size: calc($font-size-global * 2);

#textbox {
    appearance: none;
    font-family: $font-family;
    font-size: $font-size;

    min-width: 12rem;
    padding: 0.5rem 1rem;

    color: $color-text;
    background: $color-background;
    border-radius: $border-radius;
    border: $border-width solid $color-border;
}
</style>