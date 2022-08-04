<script setup lang="ts">
import { onUpdated } from 'vue';

const props = defineProps<{
    /** 
     * Fill color to display while the switch is activated.
     * @default black 
     */
    color?: string
    /** @default 4rem */
    size?: string
    /** Passed through v-model */
    modelValue?: boolean
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>();

const { color = "black", size = "4rem" } = props;

onUpdated(() => {
    emit('update:modelValue', props.modelValue as boolean);
});
</script>

<!---->

<template>
    <label class="switch">
        <input type="checkbox" v-model="modelValue"/>
        <span class="slider" />
    </label>
</template>

<!---->

<style scoped lang="scss">
// Local variables
$border-radius: $border-radius-pill;
$border-width: $border-width-global;
$color-border: $color-border-global;
$color-circle-bg: $palette-white;
$color-fill: v-bind(color);
$size: v-bind(size);
$transition: 0.12s ease-out;


// Attributes shared between pseudo elements
@mixin pseudo {
    content: "";
    position: absolute;
    margin: $border-width;
    left: 0;
    bottom: 0;
}


// The component's surrounding container
.switch {
    position: relative;
    display: inline-block;
    vertical-align: top;
    
    height: $size;
    width: calc($size * 2);
}


// Background / Outline part of the switch
.slider {
    cursor: pointer;
    position: absolute;
    height: 100%;
    width: 100%;
    border: solid $border-width $color-border;
    border-radius: $border-radius;

    // The circle bit
    &:after {
        @include pseudo;
        
        height: calc($size - $border-width*4);
        width: calc($size - $border-width*3);
        
        background: $color-circle-bg;
        border: solid $border-width $color-border;
        border-radius: 50%;

        transition: $transition;
    }

    // Background color that fills the switch while activated
    &:before {
        @include pseudo;
        
        height: calc(100% - $border-width*2);
        width: calc($size - $border-width*3);

        background: $color-fill;
        border-radius: $border-radius;

        transition: $transition;
    }
}


// Input states
input[type="checkbox"] {
    appearance: none; // hides the default appearance
    
    /* Focused */
    &:focus + .slider {
        box-shadow: blue 0 0 2px;
    }
    
    /* Checked */
    &:checked + .slider:before { // background color
        width: calc(100% - $border-width*2);
    }

    &:checked + .slider:after { // circle
        transform: translateX(calc($size - $border-width));
    }

    /* Disabled */
    &:disabled + .slider:before { // background color
        visibility: hidden;
    }

    &:disabled + .slider:after { // circle
        background: none;
    }
}
</style>