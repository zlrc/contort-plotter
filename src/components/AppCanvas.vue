<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { GraphCalculator } from '@/scene';

const emit = defineEmits<{ 
    (e: 'ready', value: GraphCalculator) : void 
}>();

const ro = new ResizeObserver(onResize);
const containerRef = ref<HTMLElement>();
const canvasRef = ref<HTMLCanvasElement>();

let container: HTMLElement;
let canvas: HTMLCanvasElement;
let calculator: GraphCalculator;

onMounted(() => {
    canvas = canvasRef.value as HTMLCanvasElement;
    container = containerRef.value as HTMLElement;
    calculator = new GraphCalculator(canvas);

    window.addEventListener("resize", onResize, false);
    ro.observe(container);

    onResize();
    draw();
    emit('ready', calculator);
});

onUnmounted(() => {
    window.removeEventListener("resize", onResize, false);
    ro.unobserve(container);
});

/** Draw loop for the canvas. */
function draw() {
    calculator.render();
    window.requestAnimationFrame(draw);
}

/** Correctly resizes the canvas to fill its container. */
function onResize() {
    // End the function if container is undefined
    if (!container || !canvas)
        return;

    // Resize the canvas
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Resize the scene render
    calculator.resize(canvas.width, canvas.height);
    calculator.render();
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
    flex: 1 0 auto;
    width: 100%;
}

#main-canvas {
    position: absolute;
    width: 100%;
}
</style>