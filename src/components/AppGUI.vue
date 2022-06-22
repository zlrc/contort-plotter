<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GraphCalculator } from '@/scene';
import SquareButton from './SquareButton.vue';

const props = defineProps<{
    scene: GraphCalculator
}>();

const menuOpen = ref(false);

onMounted(() => {
    return;
});

function onMenuButtonClick() {
    menuOpen.value = !menuOpen.value;
}
</script>

<!---->

<template>
    <div id="tray-container" :class="{open: menuOpen}">
        <SquareButton id="menu-button" @click.stop="onMenuButtonClick"/>
        <!--FlagButton class="modifier-chain__node" /-->
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
$color-tray-bg: $palette-black;
$color-menu-button-bg: $palette-yellow;
$height-tray: 5rem;

#tray-container {
    display: flex;
    
    width: 100%;
    flex: 0 0 $height-tray;

    transition: flex-basis 0.25s ease-in-out;
    background: $color-tray-bg;

    &.open {
        flex-basis: 50%;
        transition: flex-basis 0.25s ease-in-out;
    }
}

#menu-button {
    position: fixed;
    right: 0;

    height: $height-tray;

    background: $color-menu-button-bg;
}
</style>