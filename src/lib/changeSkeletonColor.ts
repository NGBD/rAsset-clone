import { variablesColor } from "@/constants/skeletonColor";

/**
 * Change skeleton color by theme
 * @param theme Matches with device'theme, 'dark' || 'light'
 */
export const changeSkeletonColor = (theme: string) => {
  const rootElement = document.documentElement;
  variablesColor.forEach((_, index) => {
    rootElement.style.setProperty(
      variablesColor[index].name,
      variablesColor[index][theme]
    );
  });
};
