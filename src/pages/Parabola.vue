<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#EC368D";

const settings = ref<ModSettings>({
    xParabola: 0.5
});

function process(expr : string, settings : ModSettings) {
    return `${expr} + ${settings.xParabola}*x^2`.replace("0 + ", "");
}
</script>

<!---->

<template>
    <ModifierPage name="Parabola" :color="color" :process-fn="process" icon="parabola" v-model="settings">
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.xParabola as number)"
            icon-left="parabola-flat"
            icon-right="parabola-tall" 
        />
    </ModifierPage>
</template>

