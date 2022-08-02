<script setup lang="ts">
import { computed, ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const settings = ref<ModSettings>({
    xParabola: 0.5
});

const template = computed(() => {
    return `{expr} + ${settings.value.xParabola}*x^2`;
});
</script>

<!---->

<template>
    <ModifierPage name="Parabola" color="#EC368D" :template="template" icon="parabola" v-model="settings">
        <Slider track-color="#EC368D" :min="0.01" :max="1" :step="0.01" v-model="(settings.xParabola as number)"
            icon-left="parabola-flat"
            icon-right="parabola-tall" 
        />
    </ModifierPage>
</template>

