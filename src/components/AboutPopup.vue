<script setup lang="ts">
import { PopupOverlay } from '@/components';
</script>

<!---->

<template>
    <PopupOverlay>
        <template #title>About</template>
        <img id="logo" src="/images/logo.svg" alt="A logo with rounded, stylized letters that spell 'Contort'" />
        <h2>What is this?</h2>
        <p>
            Contort (not to be confused with "Contour") started out as a self-imposed challenge to make a 
            "toy" graphing calculator that is fun and inviting, even to early math learners. It grounds 
            itself around the following idea: 
            <i>equations can be scary, but surface plots are cool to look at.</i> 
            So it does just that. Using simplistic icons, it tries to convey a math expression as
            a chained series of "modifiers" to a single plane.
        </p>
        <div class="demo-container">
            <img src="/images/demo1.gif" alt="A demonstration showing the surface plot for x-squared plus y-squared." />
            <img src="/images/demo2.gif" alt="A slowly rotating surface plot of a hollow box with no top." />
        </div>
        <p>
            On the surface, it probably looks more like a 3D modeling tool. Granted, it kind of is, but each vertex
            is plotted from raw math expressions built from the user's input. One could even copy the full
            equation into an actual 3D graphing calculator in order to recreate the model. If you want to try that,
            you can find an option to reveal the equation behind the "..." button under the "Advanced" section of
            the menu.
        </p>
        <div class="demo-container">
            <img src="/images/demo3.gif" alt="A demonstration of options found inside the configuration menu." />
        </div>
        <p>
            This project was designed with a few different use cases and knowledge levels in mind, so there are
            (or will be) options available that cater them and are tucked away to avoid overwhelming more general
            audiences. Those who are psyched about math may enjoy revealing the equation and watching it change in
            real time as they mess around with different sliders, learning how different operators and functions
            affect the final plotted surface. The ability to enter custom expressions is available to those not
            satisfied with the provided set of modifiers (or are simply not interested in using them and just want
            a simple graphing calculator). Others may want to use this as a visualizer for their lessons, and are
            free to do so (just be sure to read the copyright statement below).
        </p>
        &nbsp;
        <h2>Copyright</h2>
        <p>
            This project was created by Mike K. You are free to use any 3D visuals that
            you create with it in your own works or lessons, commercial or otherwise, as
            long as you link back to either this website or the source code repository.
            Please refer to the repository's README file for exact information on licensing and
            how this project can be used. Thank you.
        </p>
        &nbsp;
        <template #footer>
            [<a href="https://github.com/zlrc/contort-plotter" target="_blank" rel="noopener noreferrer">Source Code</a>] |
            [<a href="https://fonts.google.com/share?selection.family=Gugi%7CNunito:ital,wght@0,400;0,700;1,400;1,700"
                target="_blank" rel="noopener noreferrer">Fonts</a>]
        </template>
    </PopupOverlay>
</template>

<!---->

<style scoped lang="scss">
#logo {
    width: 100%;
    height: 15rem;

    @media (max-width: 500px) {
        height: 8rem;
    }
}

.demo-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    height: fit-content;
    width: 100%;
    margin: 1rem 0;

    img {
        max-height: 25rem;
        margin: 1rem;
        border: black $border-width-global solid;
    }
}
</style>