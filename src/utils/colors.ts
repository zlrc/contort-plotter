/**
 * This file contains modified snippets of code from Stack Overflow, 
 * which are licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).
 * The sources are linked below where appropriate.
 */

/** How much to shift brightness by in the contrast functions. */
const CONTRAST_SHIFT = 150;

/** Memoized Outputs */
let contrastStrMemo : {[key:string] : string} = {};

/**
 * Clamps a color value between 0 and 255.
 * @param value 
 */
function clamp(value: number): number {
    return Math.max(0, Math.min(value, 255));
}

/**
 * Converts an rgb() or rgba() string into an array of length 4.  
 * https://stackoverflow.com/a/21966100
 * @param input 
 */
export function parseColor(input : string): [number, number, number, number] {
    const arr = input.split("(")[1].split(")")[0].split(",");
    if (arr)
        return [parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), arr.length == 4 ? parseInt(arr[3]) : 1];
    return [0, 0, 0, 0];
}

/**
 * Computes a color with contrasting brightness to the original.  
 * https://stackoverflow.com/a/11868159
 * @param red 
 * @param green 
 * @param blue 
 * @param alpha
 * @returns the resulting color as an array in the following form: [r, g, b, a]
 */
export function contrast(red : number, green : number, blue : number, alpha: number) : number[] {
    // http://www.w3.org/TR/AERT#color-contrast
    const brightness = Math.round(((red * 299) +
        (green * 587) +
        (blue * 114)) / 1000);
    const s = (brightness > 125) ? -CONTRAST_SHIFT : CONTRAST_SHIFT;
    return [clamp(red+s), clamp(green+s), clamp(blue+s), alpha];
}

/**
 * Takes an rgb() or rgba() string and returns a contrasting rgb color. 
 * This function internally calls {@link contrast()} and caches the results
 * for faster subsequent calls.
 * @param str 
 */
export function contrastStr(str : string): string {
    if (str in contrastStrMemo)
        return contrastStrMemo[str];
    const [r, g, b] = contrast(...parseColor(str));
    const result = `rgb(${r}, ${g}, ${b})`;
    contrastStrMemo[str] = result; // cache result 
    return result;
}
