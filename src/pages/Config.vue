<script setup lang="ts">
import { inject, Ref } from 'vue';
import {
    RoundButton, 
    Slider, 
    ToggleSwitch, 
    ToolboxSection 
} from '@/components';
import { GraphCalculator } from '@/scene';

const emit = defineEmits<{
    /** Emits when a navigation button is clicked, indicating a modifier being selected */
    (e: 'redirect', pageName: string): void
}>();

const scene = inject("scene") as GraphCalculator;
const showEquation = inject("showEquation") as Ref<boolean>;

const propsCommon : { [key: string]: Object } = {
    "ToggleSwitch": {
        class: "Config__switch"
    },
    "Slider": {
        class: "Config__slider",
        trackColor: "black"
    }
}

const sections = [
    {
        title: "",
        items: [
            {
                content: "Auto Rotate:   ", is: ToggleSwitch, props: {},
                value: scene.controls.autoRotate,
                update: (value: boolean) => scene.setAutoRotate(value)
            },
            {
                content: "Enable Panning: ", is: ToggleSwitch, props: {},
                value: scene.controls.enablePan,
                update: (value: boolean) => scene.controls.enablePan = value
            },
            {
                content: "Show Equation:", is: ToggleSwitch, props: {},
                value: showEquation.value,
                update: (value: boolean) => showEquation.value = value
            },
            {
                content: "Solid:", is: ToggleSwitch, props: {},
                value: scene.config.mesh,
                update: (value: boolean) => scene.toggleMesh(value)
            },
            {
                content: "Wireframe:", is: ToggleSwitch, props: {},
                value: scene.config.wireframe,
                update: (value: boolean) => scene.toggleWireframe(value)
            },
        ]
    },
    {
        title: "Polygon Count:",
        items: [
            {
                content: "", is: Slider, props: {min: 1, max: 32, step: 1, iconLeft: "abs", iconRight: "parabola"},
                value: Math.sqrt(scene.config.numFaces),
                update: (value: number) => scene.setPolygons(value * value)
            }
        ]
    }
];
</script>

<!---->

<template>
    <ToolboxSection>
        <RoundButton size="4rem" fill-color="none" icon="back" @click="emit('redirect','MainPage')" />
    </ToolboxSection>
    
    <ToolboxSection class="Config__section" v-for="section in sections" :title="section.title">
        <component v-for="item in section.items" 
            :is="item.is"
            :model-value="item.value" 
            v-bind="{...propsCommon[item.is.__name as string], ...item.props}"
            @update:model-value="item.update"
        >
            {{ item.content }}
        </component>
    </ToolboxSection>
</template>

<!---->

<style scoped lang="scss">
.Toolbox__section {
    margin-bottom: 2rem;

    button {
        margin-right: 1rem;
        padding: 0 1rem;
    }
}

.Config__section {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>

<style scoped lang="scss">
.Config__switch {
    width: 18rem;
    padding-bottom: 1rem;

    @media (max-width: 615px) {
        width: 100%;
    }
}

.Config__slider {
    width: 100%;
    padding-top: 1rem;
}
</style>