<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage } from '@/components';

const color = "#FFFFFF";

const settings = ref<ModSettings>({
    // Any variables you store here can be accessed through
    // the `settings` argument inside of `process()` 
});

/**
 * @param expr the expression's pre-modified state
 * @param settings contains values configured by the user 
 * @returns a modified expression
 */
function process(expr: string, settings: ModSettings) {
    return `${expr}`;
}
</script>

<!---->

<template>
    <ModifierPage name="PageTemplate" :color="color" :process-fn="process" icon="ellipsis" v-model="settings">
        <!-- Page Contents Go Here -->
    </ModifierPage>
</template>

<!---->

<style scoped lang="scss">
</style>