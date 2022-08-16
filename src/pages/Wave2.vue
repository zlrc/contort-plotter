<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#5aa9e6";

const settings = ref<ModSettings>({
    period: 3.14,
    amplitude: 1
});

function process(expr: string, settings: ModSettings) {
    if (expr == "0") // using ''==' here to check the numerical value, as well
        expr = "x";
    const amp = settings.amplitude === 1 ? '' : `${settings.amplitude}`;
    const inside = settings.period === 1 ? `${expr}` : `${settings.period}(${expr})`;
    return `${amp}sin(${inside})`;
}
</script>

<!---->

<template>
    <ModifierPage name="Wave2" :color="color" :process-fn="process" icon="wave2" v-model="settings">
        <Slider :track-color="color" :min="1.00" :max="6.28" :step="0.01" v-model="(settings.period as number)"
            icon-left="wave2-wide" icon-right="wave2-thin" />
        &nbsp; &nbsp;
        <Slider :track-color="color" :min="0.01" :max="2" :step="0.01" v-model="(settings.amplitude as number)"
            icon-left="wave2-flat" icon-right="wave2" />
    </ModifierPage>
</template>