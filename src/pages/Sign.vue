<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const color = "#2FA951";

const settings = ref<ModSettings>({
    shift: 0
});

function process(expr: string, settings: ModSettings) {
    if (settings.shift === 0)
        return `sign(${expr})`;
    const op = settings.shift < 0 ? '-' : '+';
    return `sign((${expr}) ${op} ${Math.abs(settings.shift as number)})`;
}
</script>

<!---->

<template>
    <ModifierPage name="Sign" :color="color" :process-fn="process" icon="sign" v-model="settings">
        &nbsp;
        <Slider :track-color="color" :min="-1" :max="1" :step="0.01" v-model="(settings.shift as number)"
            icon-left="sign-down" icon-right="sign-up" />
    </ModifierPage>
</template>