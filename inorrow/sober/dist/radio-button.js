import { useElement, useProps } from './core/element.js';
import './ripple.js';
const name = 's-radio-button';
const props = useProps({
    disabled: false,
    checked: false,
    name: '',
    $value: ''
});
const style = /*css*/ `
:host{
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  cursor: pointer;
  position: relative;
  height: 40px;
  color: var(--s-color-on-surface-variant, ${"#40484C" /* Theme.colorOnSurfaceVariant */});
}
:host([checked=true]){
  color: var(--s-color-primary, ${"#006782" /* Theme.colorPrimary */});
}
:host([disabled=true]){
  pointer-events: none;
}
.container{
  position: relative;
  height: 100%;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
:host([disabled=true]) .container{
  color: var(--s-color-on-surface, ${"#191C1E" /* Theme.colorOnSurface */}) !important;
  opacity: .38 !important;
}
.unchecked,
.checked{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.checked{
  position: absolute;
  transform: scale(.5);
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: var(--s-motion-easing-emphasized, ${"cubic-bezier(0.2, 0, 0, 1.0)" /* Theme.motionEasingEmphasized */});
  transition-duration: var(--s-motion-duration-short4, ${"200ms" /* Theme.motionDurationShort4 */});
}
:host([checked=true]:not([indeterminate=true])) .checked{
  opacity: 1;
  transform: scale(1);
}
.dot{
  width: 60%;
  height: 60%;
  transform: scale(0.4);
  background: currentColor;
  border-radius: 50%;
}
.ripple{
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  height: 100%;
  width: auto;
  border-radius: 50%;
}
svg,
::slotted(:is([slot=checked], [slot=unchecked])){
  color: currentColor;
  fill: currentColor;
  width: 60%;
  height: 60%;
}
`;
const template = /*html*/ `
<div class="container" part="container">
  <slot class="unchecked" name="unchecked">
    <svg viewBox="0 -960 960 960">
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
    </svg>
  </slot>
  <slot class="checked" name="checked">
    <div class="dot"></div>
  </slot>
</div>
<slot></slot>
<s-ripple class="ripple" attached="true" part="ripple"></s-ripple>
`;
export class RadioButton extends useElement({
    style, template, props,
    setup() {
        this.addEventListener('click', () => {
            this.checked = true;
            if (this.name) {
                document.querySelectorAll(`${this.tagName}[name='${this.name}']`).forEach((item) => {
                    if (item === this)
                        return;
                    item.checked = false;
                });
            }
            this.dispatchEvent(new Event('change'));
        });
    }
}) {
}
RadioButton.define(name);
