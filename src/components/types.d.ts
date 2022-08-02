/** Metadata that represents a single modifier in the chain. */
declare type ModData = {
    /** `src/pages/{pageName}.vue` */
    pageName: string;
    /** The modifier's template expression, which should have `{expr}` as a placeholder for the base expression. */
    template: string;
    /** Color of the chain button (`ChainNodeButton.vue`). */
    color: string;
    /** Icon displayed on the chain button (`ChainNodeButton.vue`). */
    icon: string;
    /** Specific settings for this modifier */
    settings?: ModSettings;
}

/** A dictionary of modifier-specific settings. */
declare type ModSettings = {
    [key: string]: number | boolean;
}
