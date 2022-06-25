<script setup lang="ts">
const props = defineProps<{
    /** Passed through v-model */
    modelValue?: number

    /** @default 1 */
    min?: number

    /** @default 100 */
    max?: number

    /** @default 1 */
    step?: number

    /** @default white */
    trackColor?: string

    /** @default black */
    thumbColor?: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>();

const {
    min = 1, max = 100, step = 1,
    trackColor = "white", thumbColor = "black",
} = props;
</script>

<!---->

<template>
    <div id="Slider__container">
        <div class="Slider__tick start"/>
        <input type="range" 
            :min="min" :max="max" 
            :value="modelValue" :step="step"
            @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        />
        <div class="Slider__tick end"/>
    </div>
</template>

<!---->

<style scoped lang="scss">
/*
The selector below resets the styling across all vendors.
Please do not modify this reset block. All customization must be done
within the block beneath it, labeled "Custom Styles".
References: 
    - https://www.smashingmagazine.com/2021/12/create-custom-range-input-consistent-browsers/
    - https://github.com/darlanrod/input-range-scss/blob/b913aefac1be77adcf6a6cbf2c3617f3a9f8855c/_inputrange.scss
    - https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/ (outdated)
*/
[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    cursor: pointer;
    
    &:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }
    
    &::-ms-track {
        border-color: transparent;
        color: transparent;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
}

/* Custom Styles */
$border-width-track: 0rem;
$border-radius: 8rem;

$color-thumb: v-bind(thumbColor);
$color-track: v-bind(trackColor);

$height-track: 0.8rem;
$height-thumb: 4rem;
$height-thumb-focus: $height-thumb + 0.75rem;
$width-thumb: 1.4rem;
$width-thumb-focus: $width-thumb + 0.75rem;

@mixin webkit-thumb-offset($track-border-width, $track-height, $thumb-height) {
    margin-top: calc((0rem - $track-border-width * 2 + $track-height)/2 - $thumb-height/2);
}

@mixin thumb {
    height: $height-thumb;
    width: $width-thumb;

    border: none;
    border-radius: $border-radius;
    
    background: $color-thumb;
    transition: all 0.2s ease;

    &:hover {
        @include thumb-focus;
    }
}

@mixin thumb-focus {
    height: $height-thumb-focus;
    width: $width-thumb-focus;
}

@mixin track {
    height: $height-track;
    border-radius: $border-radius;
    background: $color-track;
}

.Slider__tick {
    $offset: -1.5rem;
    display: block;
    height: 3rem;
    width: 3rem;

    border-radius: 100%;
    background: $color-track;

    &.start {
        margin-right: $offset;
    }

    &.end {
        margin-left: $offset;
    }
}

#Slider__container {
    display: flex;
    flex-direction: row;
}

[type=range] {
    z-index: 1;

    // Thumb
    &::-webkit-slider-thumb {
        @include thumb;
        @include webkit-thumb-offset($border-width-track, $height-track, $height-thumb);
        &:hover {
            @include webkit-thumb-offset($border-width-track, $height-track, $height-thumb-focus);
        }
    }

    &::-moz-range-thumb {
        @include thumb;
    }

    &::-ms-thumb {
        @include thumb;
    }

    // Track
    &::-webkit-slider-runnable-track {
        @include track;
    }

    &::-moz-range-track {
        @include track;
    }

    // Focus
    &:focus {
        &::-webkit-slider-thumb{ 
            @include thumb-focus;
            @include webkit-thumb-offset($border-width-track, $height-track, $height-thumb-focus);
        }

        &::-moz-range-thumb { 
            @include thumb-focus; 
        }
    }
}
</style>