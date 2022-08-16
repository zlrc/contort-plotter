<script setup lang="ts">
import { ref } from 'vue';
import { ModifierPage, TextInputBox, ToolboxSection } from '@/components';
import { evaluate, simplify } from '@/utils/parser';

const color = "#FAF3EB";

const settings = ref<ModSettings>({
    text: "{expr}",
    expr: ""
});

function process(expr: string, settings: ModSettings) {
    settings.expr = expr;
    const result = (settings.text as string).replaceAll('{expr}', expr);
    try {
        if (!result)
            throw new Error();
        evaluate(result, {x:0.1,y:0.1,t:0.1});
        return result;
    } catch {
        return expr;
    }
}
</script>

<!---->

<template>
    <ModifierPage name="CustomExpr" :color="color" :process-fn="process" icon="custom" v-model="settings">
        <ToolboxSection class="input-box__container">
            <p class="func-text">f(x, y) = </p>
            <TextInputBox class="input-box" v-model="(settings.text as string)" aria-label="Enter an expression for f(x,y)." />
        </ToolboxSection>

        <ToolboxSection>
            <div class="expr-text">
                {expr} = {{simplify(settings.expr as string).toString()}}
            </div>
        </ToolboxSection>
    </ModifierPage>
</template>

<!---->

<style scoped lang="scss">
.input-box__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}
.input-box {
    width: 100%;
}

.func-text {
    font-size: calc(1rem + 1vw);
    width: fit-content;
    margin-right: 1rem;
    white-space: nowrap;
}

.expr-text {
    font-family: $font-stack-expr;
    font-size: calc(1rem + 1vw);
    text-align: center;
    width: 100%;
    margin-top: 2rem;
}
</style>
