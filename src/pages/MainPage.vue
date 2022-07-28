<script setup lang="ts">
import { ButtonGrid, ToolboxNavButton, ToolboxSection } from '@/components';

const emit = defineEmits<{
    /** Emits when a navigation button is clicked, indicating a modifier being selected */
    (e: 'redirect', pageName: string): void
}>();

/** Metadata */
const menu = {
    "Unnamed Section": [
        {name: "DummyPage", icon: ""},
        {name: "Parabola", icon: ""},
        {name: "Wave", icon: ""},
        {name: "Step", icon: ""}
    ],
    "Advanced": [
        {name: "CustomExpr", icon: ""}
    ]
}

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
    <ToolboxSection v-for="(pages, sectionTitle) in menu">
        <ButtonGrid>
            <ToolboxNavButton class="button-grid__button"
                v-for="page in pages"
                :key="page.name"
                :to="page.name"
                @click="onClick"
            />
        </ButtonGrid>
    </ToolboxSection>
</template>
