<script setup lang="ts">
import { ref } from 'vue';
import { AxisToggleButton, ModifierPage, Slider } from '@/components';

const color = "#EC368D";

const settings = ref<ModSettings>({
    yAxis: false,
    coef: 0.5,
});

function process(expr : string, settings : ModSettings) {
    let v = settings.yAxis ? 'y' : 'x'; // which variable to use
    const text = settings.coef === 1 ? `${v}^2` : `${settings.coef}${v}^2`;
    return `${expr} + ${text}`.replace("0 + ", "");
}
</script>

<!---->

<template>
    <ModifierPage name="Parabola" :color="color" :process-fn="process" icon="parabola" v-model="settings">
        <template v-slot:header>
            <AxisToggleButton v-model="(settings.yAxis as boolean)" :color="color" />
        </template>
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.coef as number)"
            icon-left="parabola-flat"
            icon-right="parabola-tall" 
        />
    </ModifierPage>
</template>

