<script setup lang="ts">
import { 
    inject, 
    onMounted, 
    onUpdated, 
    Ref, 
    ref 
} from 'vue';
import { ToolboxSection } from '@/components';
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
const currentExpr = ref<string>("");

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
    currentExpr.value = expr.replace("0 + ", "");
    scene.setZEquals(currentExpr.value);
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
        <button @click="onBackClick">Back</button>
        <p>{{currentExpr}}</p>
    </ToolboxSection>
    &nbsp;
    <slot />
</template>
