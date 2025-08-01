import { useElement, useProps } from './core/element.js';
const name = 's-avatar';
const props = useProps({
    $src: ''
});
const style = /*css*/ `
:host{
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  position: relative;
  font-size: 1rem;
  font-weight: 600;
  width: 40px;
  border-radius: 50%;
  color: var(--s-color-on-tertiary, ${"#ffffff" /* Theme.colorOnTertiary */});
  background: var(--s-color-tertiary, ${"#5C5B7E" /* Theme.colorTertiary */});
}
::slotted(:is(svg, s-icon)){
  color: currentColor;
  fill: currentColor;
  width: 24px;
}
::slotted([slot=badge]){
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 0 2px var(--s-color-surface, ${"#F8F9FB" /* Theme.colorSurface */});
  color: var(--s-color-on-success, ${"#ffffff" /* Theme.colorOnSuccess */});
  background: var(--s-color-success, ${"#006d43" /* Theme.colorSuccess */});
}
img{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
  inset: 0;
}
`;
const template = /*html*/ `
<slot></slot>
<slot name="badge"></slot>
`;
class Avatar extends useElement({
    style, template, props,
    setup(shadowRoot) {
        const img = document.createElement('img');
        return {
            src: (value) => {
                img.src = value;
                img.onload = () => {
                    this.dispatchEvent(new Event('load'));
                    shadowRoot.insertBefore(img, shadowRoot.children[0]);
                };
                img.onerror = () => {
                    this.dispatchEvent(new ErrorEvent('error'));
                    img.isConnected && shadowRoot.removeChild(img);
                };
            }
        };
    }
}) {
}
Avatar.define(name);
export { Avatar };
