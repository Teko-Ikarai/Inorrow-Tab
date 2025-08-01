/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TonalPalette } from '../palettes/tonal_palette.js';
import * as math from '../utils/math_utils.js';
import { DynamicScheme } from './dynamic_scheme.js';
import { Variant } from './variant.js';
/**
 * A playful theme - the source color's hue does not appear in the theme.
 */
export class SchemeFruitSalad extends DynamicScheme {
    constructor(sourceColorHct, isDark, contrastLevel) {
        super({
            sourceColorArgb: sourceColorHct.toInt(),
            variant: Variant.FRUIT_SALAD,
            contrastLevel,
            isDark,
            primaryPalette: TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 48.0),
            secondaryPalette: TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 36.0),
            tertiaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
            neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
        });
    }
}
//# sourceMappingURL=scheme_fruit_salad.js.map