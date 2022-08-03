/** Metadata that represents a single modifier in the chain. */
declare type ModData = {
    /** `src/pages/{pageName}.vue` */
    pageName: string;
    /**
     * The modifier's process function.
     * @param expr the current expression `f(x,y)`
     * @param settings the modifier's current settings
     * @returns the modified expression to pass onto the next modifier
     */
    processFn(expr: string, settings: ModSettings): string
    /** Color of the chain button (`ChainNodeButton.vue`). */
    color: string;
    /** Icon displayed on the chain button (`ChainNodeButton.vue`). */
    icon: string;
    /** Specific settings for this modifier */
    settings: ModSettings;
}

/** A dictionary of modifier-specific settings. */
declare type ModSettings = {
    [key: string]: number | boolean;
}
