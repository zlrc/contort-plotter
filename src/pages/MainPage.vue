<script setup lang="ts">
import { ButtonGrid, ToolboxNavButton, ToolboxSection } from '@/components';
import { menu } from '@/utils/constants';

const emit = defineEmits<{
    /** Emits when a navigation button is clicked, indicating a modifier being selected */
    (e: 'redirect', pageName: string): void
}>();

/**
 * Called when a button is clicked.
 * @param dest the destination page that the button leads to
 */
function onClick(dest : string) {
    emit('redirect', dest);
}
</script>

<!---->

<template>
    <ToolboxSection v-for="(pages, sectionTitle) in menu" :title="sectionTitle">
        <ButtonGrid>
            <ToolboxNavButton class="button-grid__button"
                v-for="page in pages"
                :key="page.name"
                :to="page.name"
                :icon="page.icon"
                :aria-label="page.name"
                @click="onClick"
            />
        </ButtonGrid>
    </ToolboxSection>
</template>

<!---->

<style lang="scss">
.button-grid__button {
    border-radius: $border-radius-global;
}
</style>