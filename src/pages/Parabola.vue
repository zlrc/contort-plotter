<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#EC368D";

const settings = ref<ModSettings>({
    coef: 0.5
});

function process(expr : string, settings : ModSettings) {
    const text = settings.coef === 1 ? "x^2" : `${settings.coef}x^2`;
    return `${expr} + ${text}`.replace("0 + ", "");
}
</script>

<!---->

<template>
    <ModifierPage name="Parabola" :color="color" :process-fn="process" icon="parabola" v-model="settings">
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.coef as number)"
            icon-left="parabola-flat"
            icon-right="parabola-tall" 
        />
    </ModifierPage>
</template>

