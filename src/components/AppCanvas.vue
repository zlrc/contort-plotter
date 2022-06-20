<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { GraphCalculator } from '@/scene';

const emit = defineEmits<{ 
    (e: 'ready', value: GraphCalculator) : void 
}>();

const containerRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();

let canvas: HTMLCanvasElement;
let calculator: GraphCalculator;

onMounted(() => {
    window.addEventListener("resize", onWindowResize, false);

    canvas = canvasRef.value as HTMLCanvasElement;
    calculator = new GraphCalculator(canvas);

    onWindowResize();
    draw();
    emit('ready', calculator);
});

onUnmounted(() => {
    window.removeEventListener("resize", onWindowResize, false);
});

/** Draw loop for the canvas. */
function draw() {
    calculator.render();
    window.requestAnimationFrame(draw);
}

/** Correctly resizes the canvas to fill its container. */
function onWindowResize() {
    const container: HTMLElement | undefined = containerRef.value;

    // End the function if container is undefined
    if (!container)
        return;

    // Resize the canvas
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Resize the scene render
    calculator.resize(container.clientWidth, container.clientHeight);
}
</script>

<!---->

<template>
    <div ref="containerRef" id="canvas-container">
        <canvas ref="canvasRef" id="main-canvas" />
    </div>
</template>

<!---->

<style lang="scss">
#canvas-container {
    width: 100%;
    height: 100%;
}

#main-canvas {
    width: 100%;
    height: 100%;
}
</style>