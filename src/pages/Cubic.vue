<script setup lang="ts">
import { ref } from 'vue';
import { AxisToggleButton, ModifierPage, Slider } from '@/components';

const color = "#40a98e";

const settings = ref<ModSettings>({
    yAxis: false,
    coef: 0.5,
    shift: 0
});

function process(expr: string, settings: ModSettings) {
    let v = settings.yAxis ? 'y' : 'x'; // which variable to use
    // Determine the operation to use (+/-) for shifting
    if (settings.shift != 0) { // determine the sign to use for shifting
        const shift = Math.abs(settings.shift as number);
        v = settings.shift < 0 ? `(${v}-${shift})` : `(${v}+${shift})`;
    }
    const text = settings.coef === 1 ? `${v}^3` : `${settings.coef}${v}^3`;
    return `${expr} + ${text}`.replace("0 + ", "");
}
</script>

<!---->

<template>
    <ModifierPage name="Cubic" :color="color" :process-fn="process" icon="cubic" v-model="settings">
        <template v-slot:header>
            <AxisToggleButton v-model="(settings.yAxis as boolean)" :color="color" />
        </template>
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.coef as number)"
            icon-left="cubic-flat" icon-right="cubic" />
        &nbsp; &nbsp;
        <Slider :track-color="color" :min="-1" :max="1" :step="0.01" v-model="(settings.shift as number)"
            icon-left="cubic-left" icon-right="cubic-right" />
    </ModifierPage>
</template>

