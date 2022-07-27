<script setup lang="ts">
import { FlagButton } from '@/components';

const emit = defineEmits<{
    /** Overridden click even that returns the node's index */
    (e: 'click', id: string): void
}>();

const props = defineProps<{
    /** Unique id of the node */
    id: string
    /** @default white */
    fillColor?: string
    /** Name of the SVG icon from `src/icons/` (without the file extension) */
    icon? : string
}>();

const { fillColor } = props;

function onClick() {
    emit('click', props.id);
}
</script>

<!---->

<template>
    <FlagButton class="modifier-chain__node" :fill-color="fillColor" @click="onClick" />
</template>

<!---->

<style lang="scss" scoped>
.modifier-chain__node {
    flex-shrink: 0;
    margin-left: 0;
    padding-left: 0;
    margin-right: -2.75rem;
}
</style>
