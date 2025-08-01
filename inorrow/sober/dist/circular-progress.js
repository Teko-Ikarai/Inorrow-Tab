import { useElement, useProps } from './core/element.js';
const name = 's-circular-progress';
const props = useProps({
    indeterminate: false,
    animated: false,
    $max: 100,
    $value: 0
});
const style = /*css*/ `
:host{
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 48px;
  aspect-ratio: 1;
  -webkit-aspect-ratio: 1;
  color: var(--s-color-primary, ${"#006782" /* Theme.colorPrimary */});
}
:host([animated=true]) .known .block{
  transition-duration: var(--s-motion-duration-medium4, ${"400ms" /* Theme.motionDurationMedium4 */});
  transition-timing-function: var(--s-motion-easing-emphasized, ${"cubic-bezier(0.2, 0, 0, 1.0)" /* Theme.motionEasingEmphasized */});
  transition-name: stroke-dashoffset, transform;
}
:host([indeterminate=true]) .known,
.unknown{
  display: none;
}
:host([indeterminate=true]) .unknown,
.known{
  display: block;
}
.container{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
}
svg{
  height: inherit;
  width: inherit;
  stroke: currentColor;
}
circle{
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: var(--dasharray);
}
.track{
  stroke: var(--s-color-secondary-container, ${"#CFE6F1" /* Theme.colorSecondaryContainer */});
}
.unknown{
  animation: rotate 1568ms linear infinite;
}
@keyframes stroke{
  0% { stroke-dashoffset: var(--dasharray) }
  50% { stroke-dashoffset: calc(var(--dasharray) / 4) }
  100% { stroke-dashoffset: var(--dasharray) }
}
@keyframes stroke-rotate{
  0% { transform: rotate(0deg) }
  12.5% { transform: rotate(0deg) }
  25% {transform: rotate(270deg)}
  37.5% {transform: rotate(270deg)}
  50% {transform: rotate(540deg)}
  62.5% {transform: rotate(540deg)}
  75% {transform: rotate(810deg)}
  87.5% {transform: rotate(810deg)}
  100% { transform: rotate(1080deg) }
  100% { transform: rotate(1080deg) }
}
@keyframes rotate{
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
`;
const size = 48;
const borderWidth = 4;
const dasharray = (size - borderWidth) * Math.PI;
const template = /*html*/ `
<div class="container known">
  <svg viewBox="0 0 48 48" style="transform: rotate(-90deg);--dasharray: ${dasharray}px;">
    <circle class="track block" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-width: ${borderWidth}px" />
    <circle class="indicator block" cx="${size / 2}" cy="${size / 2}" r="${(size - borderWidth) / 2}" style="stroke-dashoffset: ${dasharray}px;stroke-width: ${borderWidth}px" />
  </svg>
</div>
<div class="container unknown">
  <svg viewBox="0 0 48 48" style="animation: stroke-rotate 5.2s ease-in-out infinite;--dasharray: ${dasharray}px;">
    <circle transform="rotate(-90, ${size / 2}, ${size / 2})" cx="${size / 2}" cy="${size / 2}" r=" ${(size - borderWidth) / 2}" style="animation: stroke 1.3s ease-in-out infinite;stroke-width: ${borderWidth}px"></circle>
  </svg>
</div>
`;
export class CircularProgress extends useElement({
    style, template, props,
    setup(shadowRoot) {
        const track = shadowRoot.querySelector('.known .track');
        const indicator = shadowRoot.querySelector('.known .indicator');
        const update = () => {
            const percentage = Math.min(this.value, this.max) / this.max * 100;
            const value = dasharray - (dasharray * (percentage / 100));
            const deg = percentage / 100 * 360;
            track.style.strokeDashoffset = `${percentage === 0 ? 0 : Math.min((dasharray + 16) - value, dasharray)}px`;
            track.setAttribute('transform', `rotate(${deg + 20}, ${size / 2}, ${size / 2})`);
            indicator.style.strokeDashoffset = `${value}px`;
        };
        return { max: update, value: update };
    }
}) {
}
CircularProgress.define(name);
