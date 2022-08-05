<script setup lang="ts">
import { computed, defineAsyncComponent, provide, ref } from 'vue';
import { ChainNodeButton, SquareButton } from '@/components';
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
    <div id="equation" v-if="showEquation">f(x, y) = {{props.scene.currentExpr}}</div>

    <div id="Toolbox__container">

        <div id="Toolbox__tray">
            <SquareButton id="menu-button" icon="settings" @click.stop="onMenuButtonClick" />
            <div id="modifier-chain__container">
                <div id="modifier-chain__flexwrap">
                    <ChainNodeButton 
                        v-for="id in [...modChain.keys()].reverse()"
                        :key="id"
                        :id="id"
                        :fill-color="modChain.get(id)?.color"
                        :icon="modChain.get(id)?.icon"
                        @click="onNodeClick"
                    />
                </div>
            </div>
        </div>

        <div id="Toolbox__body" :class="{open: menuOpen}">
            <div id="Toolbox__body__content">
                <component 
                    :key="currentKey" 
                    :is="currentPage" 
                    v-bind="currentProps" 
                    @redirect="onRedirect" 
                />
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
    overflow-y: scroll;

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
    overflow-x: hidden; // TODO: drag to scroll
    overflow-y: clip;
    height: 100%;
    width: calc(100% - $height-tray);
}

#modifier-chain__flexwrap {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    height: 100%;
    width: max-content;
}
</style>