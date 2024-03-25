import { twMerge as twMergeOriginal } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

/**
 * The function `twMerge` merges multiple class values into a single class value using the `clsx`
 * function.
 * @param {ClassValue[]} args - An array of ClassValue objects.
 * @returns the result of calling the `twMergeOriginal` function with the result of calling the `clsx`
 * function with the `args` array as its argument.
 * 
 * Example:
 * ```ts
 * twMerge(
 *   'px-8 sticky grid items-center grid-flow-col grid-cols-1 transition'
 *   'cursor-pointer bg-clip-padding border-y border-white',
 *   'hover:bg-grey-700-opaque-5 py-4 mb-10 rounded-lg',
 *  {
 *     'bg-white': !transparentWhenFloaty || position !== Position.Floaty,
 *     invisible: isInvisible,
 *     'before:absolute before:left-0 before:-top-px before:w-full before:h-px before:bg-white': position === Position.StickyTop,
 *     'before:absolute before:left-0 before:-bottom-px before:w-full before:h-px before:bg-white': position === Position.StickyBottom,
 *     'border-t-grey-700/10': position === Position.StickyBottom
 *     'border-b-grey-700/10': position !== Position.StickyBottom
 *   }
 *  )
 * ```
 *
 * See documents to know why and how to use this:

 * tailwind-merge: https://www.npmjs.com/package/tailwind-merge,
 *
 * clsx:           https://www.npmjs.com/package/clsx
 *
 */
export function twMerge(...args: ClassValue[]) {
  return twMergeOriginal(clsx(args));
}
