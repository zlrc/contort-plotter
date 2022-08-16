<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, Slider, SVGIcon, ToggleSwitch, ToolboxSection } from '@/components';

const color = "#a14592";

const settings = ref<ModSettings>({
    reflect: false,
    shift: 0
});

function process(expr: string, settings: ModSettings) {
    const sign = settings.reflect ? '-' : '';
    const op = settings.shift < 0 ? '-' : '+';
    if (settings.shift == 0)
        return `${sign}(${expr})`;
    return `${sign}(${expr}) ${op} ${Math.abs(settings.shift as number)}`;
}
</script>

<!---->

<template>
    <ModifierPage name="Transform" :color="color" :process-fn="process" icon="trans" v-model="settings">
        <ToolboxSection class="section">
            <ToggleSwitch :color="color" v-model="(settings.reflect as boolean)" aria-label="Toggle Reflect over X/Y plane" >
                <SVGIcon class="toggle-icon" name="reflect" aria-hidden="true" />
            </ToggleSwitch>
        </ToolboxSection> 
        <Slider :track-color="color" :min="-1" :max="1" :step="0.01" v-model="(settings.shift as number)"
            icon-left="shift-down" icon-right="shift-up" />
    </ModifierPage>
</template>

<!---->

<style scoped lang="scss">
.section {
    display: flex;
    justify-content: start;
    width: 100%;
    margin: 2rem 0;

    @media (min-width: 810px) {
        justify-content: center;
    }
}

.toggle-icon {
    margin: 0.5rem;
}
</style>