<script setup lang="ts">
import { ref } from 'vue';
import { AxisToggleButton, ModifierPage, Slider } from '@/components';

const color = "#2FA951";

const settings = ref<ModSettings>({
    yAxis: false,
    shift: 0,
    height: 0.5
});

function process(expr: string, settings: ModSettings) {
    const v = settings.yAxis ? 'y' : 'x'; // which variable to use
    const height = settings.height === 1 ? '' : settings.height;
    let shift = settings.shift < 0 ? ` + ${Math.abs(settings.shift as number)}` : ` - ${settings.shift}`; 
    shift = settings.shift === 0 ? '' : shift; 
    return `${expr} + ${height}sign(${v}${shift})`;
}
</script>

<!---->

<template>
    <ModifierPage name="Step" :color="color" :process-fn="process" icon="step" v-model="settings">
        <template v-slot:header>
            <AxisToggleButton v-model="(settings.yAxis as boolean)" :color="color" />
        </template>
        <Slider :track-color="color" :min="-1" :max="1" :step="0.01" v-model="(settings.shift as number)"
            icon-left="step-left" icon-right="step-right" />
        &nbsp; &nbsp;
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.height as number)"
            icon-left="step-flat" icon-right="step" />
    </ModifierPage>
</template>