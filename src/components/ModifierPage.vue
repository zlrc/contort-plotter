<script setup lang="ts">
import { 
    inject, 
    onMounted, 
    Ref,
    watchEffect
} from 'vue';
import { RoundButton, ToolboxSection } from '@/components';
import { GraphCalculator } from '@/scene';

/* Emits */
const emit = defineEmits<{
    (e: 'deleted'): void
    (e: 'redirect', pageName: string): void
    (e: 'update:modelValue', value: ModSettings): void
}>();

/* Props */
const props = defineProps<{
    /** Name of the modifier, same as the file name without the '.vue' extension. */
    name : string
    /** The modifier's process function. */
    processFn : ModData["processFn"]
    /** Color of the node button, must be CSS-friendly. */
    color? : string
    /** Name of the modifier's SVG icon stored under `src/icons/` (without the file extension) */
    icon? : string
    /** 
     * A unique identifier for distinguishing this component instance from others.  
     * **Note**: this prop is already provided by the AppGUI instance.
     */
    id? : string
    /** The current settings for the modifier */
    modelValue: ModSettings
}>();

const { name, color = "white", icon = "" } = props;
let { id = "", modelValue } = props;
let deleted = false;

const scene = inject('scene') as GraphCalculator;
const modChain = inject('modChain') as Ref<Map<string, ModData>>;

/** Updates the modifier chain in response to changes made to a single modifier */
function updateChain() {
    // Update this modifier's value
    if (!deleted) {
        const mod = modChain.value.get(id);
        if (mod) // if it exists, only update the settings
            mod.settings = modelValue;
        else // if it doesn't, add it
            modChain.value.set(id, {
                pageName: name,
                processFn: props.processFn,
                color: color,
                icon: icon,
                settings: modelValue
            });
    }
    // Update the final processed expression
    let expr = "0";
    for (const [_, mod] of modChain.value) {
        expr = mod.processFn(expr, mod.settings);
    }
    scene.setZEquals(expr);
}

/** Called when the "Back" button is clicked */
function onBackClick() {
    emit("redirect", "MainPage");
}

/** Called when the delete button is clicked */
function onDeleteClick() {
    deleted = true;
    modChain.value.delete(id);
    updateChain();
    emit("deleted");
    emit("redirect", "MainPage");
}

onMounted(() => {
    // Needs to have an ID automatically assigned by AppGUI
    if (!id) {
        console.error("One of the ModifierPage components is missing an id!");
        return;
    }
    // Look for any saved settings to load
    const data = modChain.value.get(id);
    if (data && data.settings) {
        modelValue = data.settings;
        emit("update:modelValue", data.settings); // updates the parent's state
    }
    // Update the chain & watch for updates
    watchEffect(updateChain);
});
</script>

<!---->

<template>
    <ToolboxSection>
        <div class="header__part left">
            <RoundButton size="4rem" fill-color="none" icon="back" aria-label="Back to Menu" @click="onBackClick" />
            <RoundButton size="4rem" fill-color="none" icon="delete" aria-label="Delete" @click="onDeleteClick" />
        </div>
        <div class="header__part right">
            <slot name="header" />
        </div>
    </ToolboxSection>
    <slot />
</template>

<!---->

<style scoped lang="scss">
.Toolbox__section {
    display: flex;
    margin-bottom: 2rem;

    button {
        margin-right: 1rem;
        padding: 0 1rem;
    }
}

.header__part {
    &.left {
        width: calc(100% - 4rem);
    }

    &.right {
        width: 4rem;
        display: flex;
        justify-content: end;
    }
}
</style>