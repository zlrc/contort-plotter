<script setup lang="ts">
import { ButtonGrid, RoundButton, ToolboxNavButton, ToolboxSection } from '@/components';
import { menu } from '@/utils/constants';

const emit = defineEmits<{
    /** Emits when a navigation button is clicked, indicating a modifier being selected */
    (e: 'redirect', pageName: string): void
}>();

const coffeeURL = "https://ko-fi.com/A0A75O6SL";

/**
 * Called when a button is clicked.
 * @param dest the destination page that the button leads to
 */
function onClick(dest : string) {
    emit('redirect', dest);
}

/** Redirects the user to a page where they can leave a tip. */
function onCoffeeButtonClick() {
    window.open(coffeeURL, "_blank", "noopener");
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
    <RoundButton class="coffee-button" size="fit-content" fill-color="none" icon="heart" :title="coffeeURL" 
        @click="onCoffeeButtonClick">
        <span>Buy me a coffee!</span>
    </RoundButton>
</template>

<!---->

<style lang="scss">
.button-grid__button {
    border-radius: $border-radius-global;
}

.coffee-button {
    cursor: pointer;
    display: block;

    margin-left: auto;
    margin-top: -5rem; // height + padding*2 + nav-button margin + body__content margin
    padding: 0.5rem;

    span {
        margin: 0 0.5rem;
    }

    // Temporary hack to target the SVGIcon component
    div { // TODO: provide a more specific selector
        float: left;
        height: 2rem;
    }

    @media (max-width: 599px) {
        margin: 1rem 0;
    }
}
</style>