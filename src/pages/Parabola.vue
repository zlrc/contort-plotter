<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const xParabola = ref(0.5);
const template = ref(`{expr} + ${xParabola.value}*x^2`);

function onSliderInput() {
    template.value = `{expr} + ${xParabola.value}*x^2`;
}
</script>

<!---->

<template>
    <ModifierPage name="Parabola" color="#EC368D" :template="template" icon="parabola">
        <Slider track-color="#EC368D" :min="0.01" :max="1" :step="0.01" v-model="xParabola"
            icon-left="parabola-flat"
            icon-right="parabola-tall" 
            @input="onSliderInput" 
        />
    </ModifierPage>
</template>

