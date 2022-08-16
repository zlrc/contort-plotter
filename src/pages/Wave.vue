<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#4A5899";

const settings = ref<ModSettings>({
    period: 3.14,
    amplitude: 1
});

function process(expr: string, settings: ModSettings) {
    if (expr == "0") // using '==' here to check the numerical value, as well
        expr = "x";
    const amp = settings.amplitude === 1 ? '' : `${settings.amplitude}`;
    const inside = settings.period === 1 ? `${expr}` : `${settings.period}(${expr})`;
    return `${amp}cos(${inside})`;
}
</script>

<!---->

<template>
    <ModifierPage name="Wave" :color="color" :process-fn="process" icon="wave" v-model="settings">
        <Slider :track-color="color" :min="0.01" :max="6.28" :step="0.01" v-model="(settings.period as number)" 
            icon-left="wave-wide" icon-right="wave-thin" />
        &nbsp; &nbsp;
        <Slider :track-color="color" :min="0.01" :max="2" :step="0.01" v-model="(settings.amplitude as number)" 
            icon-left="wave-flat" icon-right="wave" />
    </ModifierPage>
</template>