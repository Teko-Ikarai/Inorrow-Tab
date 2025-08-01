import { useElement, useProps } from './core/element.js';
import { Select } from './core/utils/select.js';
import './ripple.js';
import './scroll-view.js';
const name = 's-picker';
const props = useProps({
    disabled: false,
    $label: '',
    $value: ''
});
const style = /*css*/ `
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  --picker-border-radius: 4px;
  --picker-border-color: var(--s-color-outline, ${"#70787D" /* Theme.colorOutline */});
  --picker-border-width: 1px;
  --picker-padding: 16px;
  --picker-height: 48px;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.popup{
  display: block;
  cursor: pointer;
  position: relative;
}
.ripple{
  border-radius: var(--picker-border-radius);
}
.field{
  --field-border-radius: var(--picker-border-radius);
  --field-border-color: var(--picker-border-color);
  --field-border-width: var(--picker-border-width);
  --field-padding: var(--picker-padding);
  height: var(--picker-height);
  width: 100%;
  position: relative;
}
.view{
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  padding: 0 var(--picker-padding);
}
svg{
  width: 24px;
  height: 24px;
  padding: 2px;
  box-sizing: border-box;
  flex-shrink: 0;
  margin-left: min(0px, calc((var(--picker-padding) * -1) + 4px));
  margin-right: max(0px, calc(var(--picker-padding) - 12px));
  fill: var(--s-color-on-surface-variant, ${"#40484C" /* Theme.colorOnSurfaceVariant */});
}
.container{
  max-height: 408px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: .875rem;
  padding: 4px 0;
  gap: 4px;
}
`;
const template = /*html*/ `
<s-popup class="popup">
  <slot name="trigger" slot="trigger">
    <s-field fixed="false" class="field" part="field">
      <div class="label" slot="label"></div>
      <div class="view"></div>
      <svg viewBox="0 -960 960 960" slot="end">
        <path d="M480-360 280-560h400L480-360Z"></path>
      </svg>
      <s-ripple slot="custom" class="ripple" attached="true"></s-ripple>
    </s-field>
  </slot>
  <s-scroll-view class="container" part="container">
    <slot id="slot"></slot>
  </s-scroll-view>
</s-popup>
`;
export class Picker extends useElement({
    style, template, props,
    setup(shadowRoot) {
        const popup = shadowRoot.querySelector('.popup');
        const field = shadowRoot.querySelector('.field');
        const label = shadowRoot.querySelector('.label');
        const view = shadowRoot.querySelector('.view');
        const slot = shadowRoot.querySelector('#slot');
        const container = shadowRoot.querySelector('.container');
        const select = new Select({ context: this, class: PickerItem, slot });
        popup.addEventListener('show', () => {
            field.focused = true;
            field.fixed = true;
            if (!select.select) {
                view.textContent = this.label;
                view.style.opacity = '0';
            }
            container.style.minWidth = `${this.offsetWidth}px`;
            if (select.select) {
                container.scrollTo({ top: (select.select.offsetTop - container.offsetTop) - (container.offsetHeight / 2 - select.select.offsetHeight / 2) });
            }
        });
        popup.onclose = () => {
            field.focused = false;
            !select.select && (field.fixed = false);
        };
        popup.addEventListener('closed', () => container.style.removeProperty('min-width'));
        select.onUpdate = () => {
            if (!select.select) {
                field.fixed = false;
                view.textContent = '';
                return;
            }
            field.fixed = true;
            view.style.removeProperty('opacity');
            view.textContent = select.select.textContent;
        };
        select.onSelect = () => popup.close();
        return {
            expose: {
                get options() {
                    return select.list;
                },
                get selectedIndex() {
                    return select.selectedIndex;
                },
                get show() {
                    return popup.show;
                },
                get toggle() {
                    return popup.toggle;
                },
                get close() {
                    return popup.close;
                }
            },
            label: (value) => label.textContent = value,
            value: {
                get: () => select.value,
                set: (value) => select.value = value
            }
        };
    }
}) {
}
const itemName = 's-picker-item';
const itemProps = useProps({
    selected: false,
    $value: ''
});
const itemStyle = /*css*/ `
:host{
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 4px;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  flex-shrink: 0;
  padding: 0 12px;
  color: var(--s-color-on-surface, ${"#191C1E" /* Theme.colorOnSurface */});
}
:host([selected=true]){
  background: var(--s-color-secondary-container, ${"#CFE6F1" /* Theme.colorSecondaryContainer */});
  color: var(--s-color-on-secondary-container, ${"#354A53" /* Theme.colorOnSecondaryContainer */});
}
.text{
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::slotted(:is(svg, s-icon)){
  color: var(--s-color-on-surface-variant, ${"#40484C" /* Theme.colorOnSurfaceVariant */});
  fill: currentColor;
  height: 24px;
  width: 24px;
}
:host([selected=true]) ::slotted(:is(svg, s-icon)){
  color: currentColor;
}
::slotted([slot]){
  flex-shrink: 0;
}
::slotted([slot=start]){
  margin-left: -4px;
  margin-right: 8px;
}
::slotted([slot=end]){
  margin-left: 8px;
  margin-right: -4px;
}
`;
const itemTemplate = /*html*/ `
<slot name="start"></slot>
<div class="text" part="text">
  <slot></slot>
</div>
<slot name="end"></slot>
<s-ripple part="ripple" attached="true" ></s-ripple>
`;
export class PickerItem extends useElement({
    style: itemStyle,
    template: itemTemplate,
    props: itemProps,
    setup() {
        this.addEventListener('click', () => {
            if (this.selected)
                return;
            if (!(this.parentNode instanceof Picker))
                return;
            this.dispatchEvent(new Event(`${name}:select`, { bubbles: true }));
        });
        return {
            selected: () => {
                if (!(this.parentNode instanceof Picker))
                    return;
                this.dispatchEvent(new Event(`${name}:update`, { bubbles: true }));
            }
        };
    }
}) {
}
Picker.define(name);
PickerItem.define(itemName);
