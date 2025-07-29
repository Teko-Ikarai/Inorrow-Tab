import { argbFromHex, hexFromArgb, Theme, CustomColor } from '@material/material-color-utilities';
export { hexFromArgb, argbFromHex };
export declare const createScheme: (source: string | number | File | HTMLImageElement, options?: {
    page?: HTMLElement;
    customColor?: CustomColor[];
}) => Promise<{
    theme: Theme;
    colors: {
        [key: string]: string;
    };
    customColors: {
        [key: string]: string;
    };
    toString: () => string;
}>;
