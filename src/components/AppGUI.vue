<script setup lang="ts">
import { computed, defineAsyncComponent, provide, ref } from 'vue';
import { AboutPopup, ChainNodeButton, RoundButton, SquareButton } from '@/components';
import { GraphCalculator } from '@/scene';

const props = defineProps<{
    /** An instance of the Three.js GraphCalculator scene */
    scene: GraphCalculator
}>();

/** A current list of dynamically imported components */
let imports: { [key: string]: Object } = {};


/** Pages that don't need to be uniquely instanced (typically non-modifiers) */
const singletonPages = ["MainPage", "Config"];

/** Whether or not to display the current equation */
const showEquation = ref<boolean>(false);

/** Whether or not the toolbox menu is open */
const menuOpen = ref<boolean>(false);

/** Whether or not the pop-up window is open */
const popupVisible = ref<boolean>(false);

/** The Modifier Chain: a metadata list of modifiers applied to the graph */
const modChain = ref<Map<string, ModData>>(new Map());

/** Name of the current toolbox page being displayed */
const currentPageName = ref("MainPage");

/** KeepAlive key for the current toolbox page */
const currentKey = ref(currentPageName.value);

/** Props passed down to the current page component */
const currentProps = ref({});

/** The actual component object for the current page */
const currentPage = computed(() => {
    const pageName = currentPageName.value;
    // Import and cache the component if needed
    if (!(pageName in imports)) {
        imports[pageName] = defineAsyncComponent(() =>
            import(`@/pages/${pageName}.vue`)
        );
    }
    return imports[pageName];
});

/** Reference to the modifier chain container */
const chainContainer = ref<HTMLElement>();

/** The horizontal scrollbar's height */
const scrollbarHeight = computed(() => {
    const el = chainContainer.value;
    if (el)
        return `${Math.abs(el.offsetHeight - el.clientHeight)}px`;
});


// Expose variables for child components to access
provide('modChain', modChain);
provide('scene', props.scene);
provide('showEquation', showEquation);


/** Toggles opening the toolbox menu when the associated button is clicked */
function onMenuButtonClick() {
    menuOpen.value = !menuOpen.value;
}

/** Called when the user clicks on a navigation button that isn't in the top tray of nodes */
function onRedirect(pageName : string) {
    currentPageName.value = pageName;
    currentProps.value = {}; // note: may need to use a switch statement if this varies later on
    // Check if it's a static page
    if (singletonPages.includes(pageName)) {
        currentKey.value = pageName;
        return;
    }
    // Otherwise, assume it's a modifier page
    if (modChain.value.size >= 20) {
        alert("Maximum limit reached!");
        currentPageName.value = "MainPage";
        return;
    }
    const uid = Date.now().toString(36);
    currentKey.value = uid;
    currentProps.value = { id: uid };
}

/** Called when one of the nodes in the tray are clicked */
function onNodeClick(id : string) {
    currentKey.value = id;
    currentProps.value = { id: id }
    currentPageName.value = modChain.value.get(id)?.pageName as string;
    // Open the toolbox if it's closed
    if (!menuOpen.value)
        menuOpen.value = true;
}
</script>

<!---->

<template>
    <AboutPopup :show="popupVisible" @close="popupVisible = false" />
    <RoundButton id="showPopupButton" aria-label="Show About Window." size="4rem" fill-color="none" @click="popupVisible = true">?</RoundButton>
    <div id="equation" v-if="showEquation">f(x, y) = {{props.scene.currentExpr}}</div>

    <div id="Toolbox__container">

        <div id="Toolbox__tray">
            <SquareButton id="menu-button" icon="settings" aria-label="Toggle menu." @click.stop="onMenuButtonClick" />
            <div id="modifier-chain__container" ref="chainContainer">
                <div id="modifier-chain__flexwrap">
                    <ChainNodeButton 
                        v-for="id in [...modChain.keys()].reverse()"
                        :key="id"
                        :id="id"
                        :fill-color="modChain.get(id)?.color"
                        :icon="modChain.get(id)?.icon"
                        :aria-label="`Edit ${modChain.get(id)?.pageName} modifier.`"
                        @click="onNodeClick"
                    />
                </div>
            </div>
        </div>

        <div id="Toolbox__body" :class="{open: menuOpen}">
            <div id="Toolbox__body__content">
                <component :key="currentKey" :is="currentPage" v-bind="currentProps" @redirect="onRedirect" />
            </div>
        </div>

    </div>
</template>

<!---->

<style lang="scss">
#equation {
    font-family: $font-stack-expr;
    font-weight: normal;
    position: absolute;
    margin: 0.25rem 0.5rem;
}

#showPopupButton {
    position: fixed;
    font-size: calc($font-size-global + 1rem);
    margin: 1.5rem;
    right: 0;
    top: 0;

    @media (hover: hover) {
        opacity: 25%;
        transition: opacity 0.25s;
        &:hover {
            opacity: 100%;
        }
    }
}

#Toolbox__container {
    display: flex;
    flex-direction: column;
    
    width: 100%;
    flex: 0 0 0;

    background: $color-menu-button-bg;
}

#Toolbox__tray {
    width: 100%;
    height: $height-tray;
    overflow-y: clip; // clips the horizontal scrollbar
    
    @include stripe-background($color-tray-bg);

    box-shadow: -$border-width-global 0 0 $border-width-global $color-border-global inset;

    #menu-button {
        position: fixed;
        right: 0;

        height: $height-tray;
        width: $height-tray;
        padding: 0.5rem;
        
        border-width: $border-width-global;
        background: $color-menu-button-bg;
        //box-shadow: -2px 4px 10px 0 $color-border-global;
    }
}

#Toolbox__body {
    display: hidden;
    overflow-y: auto;

    height: 0;
    
    transition: height 0.25s ease-in-out;

    &.open {
        display: block;

        height: $height-toolbox-body;

        border-bottom: solid $border-width-global $color-border-global;
    }
}

#Toolbox__body__content {
    height: auto;
    margin: 1rem;
}

#modifier-chain__container {
    $height-scrollbar: v-bind(scrollbarHeight);
    overflow-x: scroll;
    overflow-y: clip;
    height: calc(100% + $height-scrollbar);
    width: calc(100% - $height-tray);
}

#modifier-chain__flexwrap {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    height: $height-tray;
    width: max-content;
}
</style>