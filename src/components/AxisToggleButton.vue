<script setup lang="ts">
import { RoundButton } from '@/components';

const props = defineProps<{
    /** True == Y, False == X */
    modelValue?: boolean
    /** Color of the highlighted axis */
    color?: string
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>();

function onClick() {
    emit('update:modelValue', !props.modelValue);
}

const { color = "white" } = props;
</script>

<!---->

<template>
    <RoundButton 
        size="4rem" 
        :class="{rotated: modelValue}" 
        fill-color="none"
        icon="axis"
        :icon-color="color"
        @click="onClick" 
    />
</template>

<!---->

<style lang="scss" scoped>
.rotated {
    transform: rotate(90deg);
}
</style>