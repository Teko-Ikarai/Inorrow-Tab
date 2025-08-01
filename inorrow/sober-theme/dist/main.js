import { argbFromHex, themeFromSourceColor, themeFromImage, hexFromArgb } from "@material/material-color-utilities";
const customs = [
  { value: argbFromHex("#008000"), name: "success", blend: true },
  { value: argbFromHex("#ffebcd"), name: "warning", blend: true }
];
const getTheme = (theme) => {
  const { palettes, schemes: { light, dark } } = theme;
  const colors = {
    "--s-color-scrim": hexFromArgb(light.scrim),
    "--s-color-primary": hexFromArgb(light.primary),
    "--s-color-on-primary": hexFromArgb(light.onPrimary),
    "--s-color-primary-container": hexFromArgb(light.primaryContainer),
    "--s-color-on-primary-container": hexFromArgb(light.onPrimaryContainer),
    "--s-color-secondary": hexFromArgb(light.secondary),
    "--s-color-on-secondary": hexFromArgb(light.onSecondary),
    "--s-color-secondary-container": hexFromArgb(light.secondaryContainer),
    "--s-color-on-secondary-container": hexFromArgb(light.onSecondaryContainer),
    "--s-color-tertiary": hexFromArgb(light.tertiary),
    "--s-color-on-tertiary": hexFromArgb(light.onTertiary),
    "--s-color-tertiary-container": hexFromArgb(light.tertiaryContainer),
    "--s-color-on-tertiary-container": hexFromArgb(light.onTertiaryContainer),
    "--s-color-error": hexFromArgb(light.error),
    "--s-color-on-error": hexFromArgb(light.onError),
    "--s-color-error-container": hexFromArgb(light.errorContainer),
    "--s-color-on-error-container": hexFromArgb(light.onErrorContainer),
    "--s-color-background": hexFromArgb(light.background),
    "--s-color-on-background": hexFromArgb(light.onBackground),
    "--s-color-outline": hexFromArgb(light.outline),
    "--s-color-outline-variant": hexFromArgb(light.outlineVariant),
    "--s-color-surface": hexFromArgb(light.surface),
    "--s-color-on-surface": hexFromArgb(light.onSurface),
    "--s-color-surface-variant": hexFromArgb(light.surfaceVariant),
    "--s-color-on-surface-variant": hexFromArgb(light.onSurfaceVariant),
    "--s-color-inverse-surface": hexFromArgb(light.inverseSurface),
    "--s-color-inverse-on-surface": hexFromArgb(light.inverseOnSurface),
    "--s-color-inverse-primary": hexFromArgb(light.inversePrimary),
    "--s-color-surface-container-lowest": hexFromArgb(palettes.neutral.tone(100)),
    "--s-color-surface-container-low": hexFromArgb(palettes.neutral.tone(96)),
    "--s-color-surface-container": hexFromArgb(palettes.neutral.tone(94)),
    "--s-color-surface-container-high": hexFromArgb(palettes.neutral.tone(92)),
    "--s-color-surface-container-highest": hexFromArgb(palettes.neutral.tone(90)),
    "--s-color-dark-scrim": hexFromArgb(dark.scrim),
    "--s-color-dark-primary": hexFromArgb(dark.primary),
    "--s-color-dark-on-primary": hexFromArgb(dark.onPrimary),
    "--s-color-dark-primary-container": hexFromArgb(dark.primaryContainer),
    "--s-color-dark-on-primary-container": hexFromArgb(dark.onPrimaryContainer),
    "--s-color-dark-secondary": hexFromArgb(dark.secondary),
    "--s-color-dark-on-secondary": hexFromArgb(dark.onSecondary),
    "--s-color-dark-secondary-container": hexFromArgb(dark.secondaryContainer),
    "--s-color-dark-on-secondary-container": hexFromArgb(dark.onSecondaryContainer),
    "--s-color-dark-tertiary": hexFromArgb(dark.tertiary),
    "--s-color-dark-on-tertiary": hexFromArgb(dark.onTertiary),
    "--s-color-dark-tertiary-container": hexFromArgb(dark.tertiaryContainer),
    "--s-color-dark-on-tertiary-container": hexFromArgb(dark.onTertiaryContainer),
    "--s-color-dark-error": hexFromArgb(dark.error),
    "--s-color-dark-on-error": hexFromArgb(dark.onError),
    "--s-color-dark-error-container": hexFromArgb(dark.errorContainer),
    "--s-color-dark-on-error-container": hexFromArgb(dark.onErrorContainer),
    "--s-color-dark-background": hexFromArgb(dark.background),
    "--s-color-dark-on-background": hexFromArgb(dark.onBackground),
    "--s-color-dark-outline": hexFromArgb(dark.outline),
    "--s-color-dark-outline-variant": hexFromArgb(dark.outlineVariant),
    "--s-color-dark-surface": hexFromArgb(dark.surface),
    "--s-color-dark-on-surface": hexFromArgb(dark.onSurface),
    "--s-color-dark-surface-variant": hexFromArgb(dark.surfaceVariant),
    "--s-color-dark-on-surface-variant": hexFromArgb(dark.onSurfaceVariant),
    "--s-color-dark-inverse-surface": hexFromArgb(dark.inverseSurface),
    "--s-color-dark-inverse-on-surface": hexFromArgb(dark.inverseOnSurface),
    "--s-color-dark-inverse-primary": hexFromArgb(dark.inversePrimary),
    "--s-color-dark-surface-container-lowest": hexFromArgb(palettes.neutral.tone(4)),
    "--s-color-dark-surface-container-low": hexFromArgb(palettes.neutral.tone(10)),
    "--s-color-dark-surface-container": hexFromArgb(palettes.neutral.tone(12)),
    "--s-color-dark-surface-container-high": hexFromArgb(palettes.neutral.tone(17)),
    "--s-color-dark-surface-container-highest": hexFromArgb(palettes.neutral.tone(22))
  };
  const inside = theme.customColors.slice(0, customs.length);
  const outside = theme.customColors.slice(customs.length);
  for (const item of inside) {
    colors[`--s-color-${item.color.name}`] = hexFromArgb(item.light.color);
    colors[`--s-color-on-${item.color.name}`] = hexFromArgb(item.light.onColor);
    colors[`--s-color-${item.color.name}-container`] = hexFromArgb(item.light.colorContainer);
    colors[`--s-color-on-${item.color.name}-container`] = hexFromArgb(item.light.onColorContainer);
    colors[`--s-color-dark-${item.color.name}`] = hexFromArgb(item.dark.color);
    colors[`--s-color-dark-on-${item.color.name}`] = hexFromArgb(item.dark.onColor);
    colors[`--s-color-dark-${item.color.name}-container`] = hexFromArgb(item.dark.colorContainer);
    colors[`--s-color-dark-on-${item.color.name}-container`] = hexFromArgb(item.dark.onColorContainer);
  }
  const customColors = {};
  for (const item of outside) {
    customColors[`${item.color.name}`] = hexFromArgb(item.light.color);
    customColors[`on-${item.color.name}`] = hexFromArgb(item.light.onColor);
    customColors[`${item.color.name}-container`] = hexFromArgb(item.light.colorContainer);
    customColors[`on-${item.color.name}-container`] = hexFromArgb(item.light.onColorContainer);
    customColors[`dark-${item.color.name}`] = hexFromArgb(item.dark.color);
    customColors[`dark-on-${item.color.name}`] = hexFromArgb(item.dark.onColor);
    customColors[`dark-${item.color.name}-container`] = hexFromArgb(item.dark.colorContainer);
    customColors[`dark-on-${item.color.name}-container`] = hexFromArgb(item.dark.onColorContainer);
  }
  return {
    theme,
    colors,
    customColors,
    toString: () => {
      let str = "";
      for (const key in colors) {
        str += `${key}: ${colors[key]};
`;
      }
      return str.trimEnd();
    }
  };
};
const createScheme = (source, options) => {
  const customColor = [...options?.customColor ?? [], ...customs];
  const setPage = (style) => options?.page && (options.page.style.cssText = style);
  return new Promise(async (resolve, reject) => {
    if (typeof source === "number" || typeof source === "string") {
      const theme = getTheme(themeFromSourceColor(typeof source === "number" ? source : argbFromHex(source), customColor));
      setPage(theme.toString());
      resolve(theme);
      return;
    }
    if (source instanceof HTMLImageElement) {
      const theme = getTheme(await themeFromImage(source, customColor));
      setPage(theme.toString());
      resolve(theme);
      return;
    }
    if (source instanceof File) {
      const img = new Image();
      img.src = URL.createObjectURL(source);
      img.onload = async () => {
        const theme = getTheme(await themeFromImage(img, customColor));
        setPage(theme.toString());
        resolve(theme);
      };
      img.onerror = reject;
    }
  });
};
export {
  argbFromHex,
  createScheme,
  hexFromArgb
};
//# sourceMappingURL=main.js.map
