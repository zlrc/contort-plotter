<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import { GraphCalculator } from '@/scene';

const emit = defineEmits<{
    (e: 'redirect', pageName: string): void
}>();

const scene = inject("scene") as GraphCalculator;

onBeforeMount(() => {
    emit('redirect', 'MainPage');
    setTimeout(() => {
        if (confirm("This feature is currently experimental! Report any problems you encounter here: https://github.com/zlrc/contort-plotter/issues"))
            scene.exportMeshOBJ("contort_mesh");
    }, 150);
});
</script>

<!---->

<template>
</template>