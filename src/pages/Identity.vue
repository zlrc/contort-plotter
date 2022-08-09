<script setup lang="ts">
import { ref } from 'vue';
import { AxisToggleButton, ModifierPage, Slider } from '@/components';

const color = "#f34216";

const settings = ref<ModSettings>({
    yAxis: false,
    slope: 0.5
});

function process(expr: string, settings: ModSettings) {
    const v = settings.yAxis ? 'y' : 'x';
    const slope = settings.slope === 1 ? '' : settings.slope;
    return `${expr} + ${slope}${v}`;
}
</script>

<!---->

<template>
    <ModifierPage name="Identity" :color="color" :process-fn="process" icon="identity" v-model="settings">
        <template v-slot:header>
            <AxisToggleButton v-model="(settings.yAxis as boolean)" :color="color" />
        </template>
        &nbsp;
        <Slider :track-color="color" :min="0.01" :max="1" :step="0.01" v-model="(settings.slope as number)"
            icon-left="identity-flat" icon-right="identity" />
    </ModifierPage>
</template>