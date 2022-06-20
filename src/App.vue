<script setup lang="ts">
import { ref } from 'vue';
import { AppCanvas } from '@/components';
import { GraphCalculator } from '@/scene';

const calculator = ref<GraphCalculator>();

function onCanvasReady(calc : GraphCalculator) {
  calculator.value = calc;
}
</script>

<!---->

<template>
  <AppCanvas @ready="onCanvasReady"/>
</template>

<!---->

<style lang="scss">
// CSS Reset by Josh W. Comeau: https://www.joshwcomeau.com/css/custom-css-reset/

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html, body, #app {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}
</style>
