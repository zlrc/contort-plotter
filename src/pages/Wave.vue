<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#4A5899";

const settings = ref<ModSettings>({
    constant: 1
});

function process(expr: string, settings: ModSettings) {
    // "sin(5x)*cos(5y)/5"
    if (expr == "0") // using ''==' here to check the numerical value, as well
        expr = "x";
    return `sin(${settings.constant} * (${expr}))`;
}
</script>

<!---->

<template>
    <ModifierPage name="Wave" :color="color" :process-fn="process" icon="wave" v-model="settings">
        <Slider :track-color="color" :min="-3.14" :max="3.14" :step="0.01" v-model="(settings.constant as number)" />
    </ModifierPage>
</template>