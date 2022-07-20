<script setup lang="ts">
import { ref } from 'vue';
import { AppCanvas, AppGUI } from '@/components';
import { GraphCalculator } from '@/scene';
import '@/styles/reset.scss';

const calculator = ref<GraphCalculator>();

function onCanvasReady(calc : GraphCalculator) {
  calculator.value = calc;
}
</script>

<!---->

<template>
  <AppCanvas @ready="onCanvasReady"/>
  <AppGUI v-if="calculator" :scene="calculator"/>
</template>

<!---->

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;

  max-height: 100%;
  max-width: 100%;
}
</style>
