<script setup lang="ts">
import { computed, ref } from 'vue';
import { ModifierPage, Slider } from '@/components';

const settings = ref<ModSettings>({
    constant: 1
});

const template = computed(() => {
    return `sin(${settings.value.constant} * ({expr}))`;
});
// "sin(5x)*cos(5y)/5"
</script>

<!---->

<template>
    <ModifierPage name="Wave" color="#4A5899" :template="template" icon="wave" v-model="settings">
        <Slider track-color="#4A5899" :min="-3.14" :max="3.14" :step="0.01" v-model="(settings.constant as number)" />
    </ModifierPage>
</template>