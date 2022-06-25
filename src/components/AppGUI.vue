<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { FlagButton, Slider, SquareButton } from '@/components';
import { GraphCalculator } from '@/scene';

const props = defineProps<{
    scene: GraphCalculator
}>();

const menuOpen = ref<boolean>(false);

const expr = props.scene.guiState.z; // default expression for now
const xParabola = ref(0);
const yParabola = ref(0);

onMounted(() => {
    return;
});

function onMenuButtonClick() {
    menuOpen.value = !menuOpen.value;
}

function onSliderInput() {
    props.scene.setZEquals(`${expr} + ${xParabola.value} * x^2 + ${yParabola.value} * y^2`);
}
</script>

<!---->

<template>
    <div id="Toolbox__container">

        <div id="Toolbox__tray">
            <SquareButton id="menu-button" @click.stop="onMenuButtonClick" />
            <div id="modifier-chain__container">
                <div id="modifier-chain__flexwrap">
                    <FlagButton class="modifier-chain__node" fill-color="violet" />
                    <FlagButton class="modifier-chain__node" fill-color="blue" />
                    <FlagButton class="modifier-chain__node" fill-color="green" />
                    <FlagButton class="modifier-chain__node" fill-color="yellow" />
                    <FlagButton class="modifier-chain__node" fill-color="orange" />
                    <FlagButton class="modifier-chain__node" fill-color="red" />
                </div>
            </div>
        </div>

        <div id="Toolbox__body" :class="{open: menuOpen}">
            <div id="Toolbox__body__content">
                <div class="Toolbox__section">
                    <h3></h3>
                    <div class="button-grid">
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                        <SquareButton class="button-grid__button" hidden/>
                    </div>
                </div>

                <div class="Toolbox__section">
                    <p>{{ `${expr} + ${xParabola}x^2 + ${yParabola}y^2` }}</p>
                    <Slider 
                        track-color="#EC368D"
                        :min="-1" :max="1" :step="0.01" 
                        v-model="xParabola" 
                        @input="onSliderInput"
                    />
                </div>
                &nbsp;
                <div class="Toolbox__section">
                    <Slider 
                        track-color="#4A5899"
                        :min="-1" :max="1" :step="0.01" 
                        v-model="yParabola" 
                        @input="onSliderInput"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<!---->

<style lang="scss">
$palette-yellow: #F5C542;
$palette-white: #FAF3EB;
$palette-pink: #EC368D;
$palette-blue: #4A5899;
$palette-black: #403F4C;
$palette-green: #2FA951;

$border-width-global: 0.25rem;

$color-border-global: #000;
$color-tray-bg: $palette-black;
$color-menu-button-bg: $palette-yellow;

$height-tray: 5rem;
$height-toolbox-body: 20rem;

@mixin stripe-background ($base-color, $dark-color: null) {
    @if ($dark-color == null) {
        $dark-color: darken($base-color, 30%);
    }
    background-image: linear-gradient(
        135deg, 
        $base-color 25%, $dark-color 25%, 
        $dark-color 50%, $base-color 50%, 
        $base-color 75%, $dark-color 75%, 
        $dark-color 100%
    );
    background-size: 98.99px 98.99px;
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
        
        border-width: $border-width-global;
        background: $color-menu-button-bg;
        //box-shadow: -2px 4px 10px 0 $color-border-global;
    }
}

#Toolbox__body {
    display: hidden;
    overflow-y: hidden;

    height: 0;
    
    transition: height 0.25s ease-in-out;

    &.open {
        display: block;

        height: $height-toolbox-body;

        border-bottom: solid $border-width-global $color-border-global;
    }
}

#Toolbox__body__content {
    overflow-y: hidden; //scroll;

    height: 100%;
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

    .modifier-chain__node {
        flex-shrink: 0;
        margin-left: 0;
        padding-left: 0;
        margin-right: -2.75rem;
    }
}

.button-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    width: 100%;

    .button-grid__button {
        height: $height-tray;
        width: $height-tray;
        margin: 1rem;

        background: $color-menu-button-bg;

        @media (max-width: 428px) {
            margin: 0.45rem;
        }
    }
}
</style>