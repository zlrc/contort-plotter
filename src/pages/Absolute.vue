<script setup lang="ts">
import { ref } from 'vue';
import { AxisToggleButton, ModifierPage, Slider } from '@/components';

const color = "#7fb34b";

const settings = ref<ModSettings>({
    yAxis: false,
    coef: 0.5,
    shift: 0
});

function process(expr : string, settings : ModSettings) {
    let v = settings.yAxis ? 'y' : 'x'; // which variable to use
    // Determine the operation to use (+/-) for shifting
    if (settings.shift != 0) { // determine the sign to use for shifting
        const shift = Math.abs(settings.shift as number);
        v = settings.shift < 0 ? `${v}-${shift}` : `${v}+${shift}`;
    } 
    const text = settings.coef === 1 ? `abs(${v})` : `${settings.coef}abs(${v})`;
    return `${expr} + ${text}`.replace("0 + ", "");
}
</script>

<!---->

<template>
    <ModifierPage name="Absolute" :color="color" :process-fn="process" icon="abs" v-model="settings">
        <template v-slot:header>
            <AxisToggleButton v-model="(settings.yAxis as boolean)" :color="color" />
        </template>
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.coef as number)"
            icon-left="abs-flat" icon-right="abs-tall" />
        &nbsp; &nbsp;
        <Slider :track-color="color" :min="-0.9" :max="0.9" :step="0.01" v-model="(settings.shift as number)"
            icon-left="abs-left" icon-right="abs-right" />
    </ModifierPage>
</template>

