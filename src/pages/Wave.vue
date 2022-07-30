<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const constant = ref(1);
const template = ref(`sin(${constant.value} * ({expr}))`);
// "sin(5x)*cos(5y)/5"

function onSliderInput() {
    template.value = `sin(${constant.value} * ({expr}))`;
}
</script>

<!---->

<template>
    <ModifierPage name="Wave" color="#4A5899" :template="template" icon="wave">
        <Slider track-color="#4A5899" :min="-3.14" :max="3.14" :step="0.01" v-model="constant" @input="onSliderInput" />
    </ModifierPage>
</template>