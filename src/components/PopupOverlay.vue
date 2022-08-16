<script setup lang="ts">
/**
 * By default, direct children of this component will be inserted inside the window's body.
 * You can inject content into other slots using the following:
 * 
 * <template #title> - to insert inside the title bar
 * 
 * <template #footer> - to insert inside the footer
 */
import { ref, watch } from 'vue';
import { RoundButton } from '@/components';

const props = defineProps<{
    /** 
     * Pop-up will show when this is true.
     * @default false 
     */
    show?: boolean
}>();

const emit = defineEmits<{
    (e: 'close') : void
}>();

const isVisible = ref(props.show);
watch(() => props.show, () => isVisible.value = props.show);
</script>

<!---->

<template>
    <Transition>
        <div id="overlay" v-if="isVisible" >
            <div class="overlay__background"/>
            <div class="overlay__container">

                <div class="window">
                    <div class="window__contents">
                        <div class="window__titlebar">
                            <h1><slot name="title"/></h1>
                            <RoundButton aria-label="Close" size="3rem" fill-color="none" @click="emit('close')">X</RoundButton>
                        </div>
                        <div class="window__body">
                            <slot />
                            <p class="window__footer"><slot name="footer"/></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Transition>
</template>

<!---->

<style scoped lang="scss">
$border-color: black;
$border-width: $border-width-global;
$window-color: $palette-yellow;


/* Injected from <Transition> while the transition is active */
.v-enter-active, .v-leave-active {
    $duration: 0.23s;
    transition: $duration ease;
    .overlay__background { transition: opacity $duration ease; }
    .window { transition: margin-top $duration ease-out; }
}

/* Injected from <Transition> as the initial/final states */
.v-enter-from, .v-leave-to {
    .overlay__background { opacity: 0; }
    .window{ margin-top: 100vh; }
}


/* Overlay */
#overlay {
    display: contents;
}

.overlay__background {
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 75%;
    transition: opacity 1s;
}

.overlay__container {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    padding: 5% calc(15% - 2rem);
}


/* Window */
.window {
    height: 100%;
    width: 100%;
    background: $window-color;
    border: solid $border-width $border-color; 
}

.window__contents {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.window__titlebar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: calc(0.1rem + 1.15%) calc(0.5rem + 1%);
    border-bottom: solid $border-width $border-color;

    h1 {
        width: calc(100% - 3rem);
    }
}

.window__body {
    overflow-y: auto;
    height: 100%;
    padding: calc(1rem + 1%);
}

.window__footer {
    position: sticky;
    width: fit-content;
    top: 100%;
    margin: 1rem;
    margin-left: auto;
    margin-right: auto;
}
</style>