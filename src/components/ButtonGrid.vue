<script setup lang="ts"></script>

<!---->

<template>
    <div class="button-grid">
        <slot />
    </div>
</template>

<!---->

<style lang="scss">
.button-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    width: 100%;
}
</style>