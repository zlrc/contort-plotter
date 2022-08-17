> **NOTE**: THIS PROJECT IS A SUBMISSION TO THE [SUMMER OF MATH EXPOSITION 2](https://www.youtube.com/watch?v=hZuYICAEN9Y). PLEASE BE AWARE THAT WHILE CONTRIBUTIONS ARE WELCOME, CERTAIN PULL REQUESTS MIGHT NOT BE ACCEPTED UNTIL AFTER **SEPT. 15TH, 2022**, OR WHEN THE REVIEW PERIOD FOR SOME2 HAS ENDED.

More information may be added at a later date, but in general please follow the provided guidelines and be sure to rebase / squash your commits before requesting approval on your changes.

## Commands

| Command           | Action                                       |
|:----------------  |:-------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm start`       | Starts local dev server on `localhost`  |
| `npm run build`   | Builds the production site to `./dist`       |
| `npm run preview` | Previews the production build locally, before deploying |


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


## Adding New Modifiers

A lot of the Vue overhead is abstracted to make it easy for new additions, but you might still find it helpful to refer to existing modifiers under `src/pages` to learn about how things are used and structured. A basic checklist of things you would need to do are as follows:

* Make a copy of the template ([`src/pages/PageTemplate.vue`](src/pages/PageTemplate.vue)) and rename it.

* Read through the comments and change any necessary variables or ModifierPage props.

* Add input components as children to ModifierPage (most common ones you might need from `@/components` are `Slider`, `ToggleSwitch` and `AxisToggleButton`) and implement the modifier's `process` function.

* Highly recommended that input components have appropriate aria-label props for screen readers.

* To add your modifier to the menu, add it to the `menu` constant under `src/utils/constants.ts`.

### Guidelines for Color Selection

* Try not to use the same color as another modifier. If the other modifier is *similar*, then it might be acceptable to use a color of a slightly different hue or shade to indicate the relationship. If the similar modifier is in a different section from the one you're adding, then using the same color might also be acceptable in this situation. However, please consider whether it might be worth to just extend an existing modifier first before making your own.  

* Modifier colors should look visually appealing next to eachother and not harsh on the eyes. You shouldn't pick a color that is too overly vibrant, but be sure it stands out from the yellow background.  

* As a general rule of thumb: *color brightness should be around **90-100% for warmer colors** (red, orange, pink...), and around **60-70% for cooler colors** (green, blue, purple...)*. There of course are exceptions to this rule, but I found that most of the colors are within these ranges. 

* If you have a knack for color theory then I encourage you to experiment, you might find a good color that I didn't even think about using!  

* Otherwise, a quick and easy solution I suggest for most people is to pick a color from the gradient below (using an eyedrop tool). Most of the colors in this gradient should be acceptable as long as they don't match other modifiers' colors too closely (see first bullet point above).

<p align="center">
    <img src=".github/resources/color-gradient.png" style="border-radius: 20px" width="50%" alt="Color Gradient" />
</p>


## Contributing Icons or other Assets

Make sure that SVG icons fit inside a 48x48-pixel frame with roughly 2 pixels of padding minimum and a stroke width of 5 pixels. Any parts of the icon that you would like to have dynamically colored should have the colors replaced by `currentColor` (e.g. `fill="currentColor"`). Please also optimize your files with SVGO, if possible.

It is highly recommended that you license your assets under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) or similar to maintain compatiblity with the project's AGPLv3 license. Refrain from the share-alike variant (CC BY-SA) as it [is only compatible with GPLv3](https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses/) and would require the extra step of isolating your assets inside a GPLv3-licensed folder (e.g. `src/utils`), which is not ideal.

You are free to append your name, the name of your icon set, and a list of individual files to [`src/icons/LICENSE_icons`](/src/icons/LICENSE_icons) to quickly license them under CC BY 4.0.