<script setup lang="ts">
import { 
    inject, 
    onMounted, 
    onUpdated, 
    Ref
} from 'vue';
import { RoundButton, ToolboxSection } from '@/components';
import { GraphCalculator } from '@/scene';

/** Type definition for modifier chain nodes */
type Modifier = {
    pageName: string;
    template: string;
    color: string;
    icon: string;
}

/* Emits */
const emit = defineEmits<{
    (e: 'redirect', pageName: string): void
}>();

/* Props */
const props = defineProps<{
    /** Name of the modifier, same as the file name without the '.vue' extension. */
    name : string
    /**
     * The modifier's template expression, instances of `{expr}` in the template are 
     * replaced with the expression it is modifying.
     */
    template : string
    /** Color of the node button, must be CSS-friendly. */
    color? : string
    /** Name of the modifier's SVG icon stored under `src/icons/` (without the file extension) */
    icon? : string
    /** A unique identifier for distinguishing this component instance from others */
    id? : string
}>();

const { name, color = "white", icon = "" } = props; // note: "template" is already reserved by vue
let { id = "" } = props;

const scene = inject('scene') as GraphCalculator;
const modChain = inject('modChain') as Ref<Map<string, Modifier>>;

/** Updates the modifier chain in response to changes made to a single modifier */
function updateChain() {
    // Update this modifier's value
    modChain.value.set(id, {
        pageName: name,
        template: props.template,
        color: color,
        icon: icon
    });
    // Update the final processed expression
    let expr = "0";
    for (const [_, mod] of modChain.value) {
        expr = mod.template.replace('{expr}', expr);
    }
    expr = expr.replace("0 + ", "");
    scene.setZEquals(expr);
}

/** Called when the "Back" button is clicked */
function onBackClick() {
    emit("redirect", "MainPage");
}

onMounted(() => {
    if (!id)
        console.error("One of the ModifierPage components is missing an id!");
    else if (!modChain.value.has(id)) {
        updateChain();
    }
});

onUpdated(() => {
    updateChain();
});
</script>

<!---->

<template>
    <ToolboxSection>
        <RoundButton size="4rem" fill-color="none" icon="back" @click="onBackClick" />
        <RoundButton size="4rem" fill-color="none" icon="delete" />
    </ToolboxSection>
    <slot />
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
</style>