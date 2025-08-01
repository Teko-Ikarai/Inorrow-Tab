import { useElement, useProps } from './core/element.js';
import { dateFormat } from './core/utils/dateFormat.js';
import { Ripple } from './ripple.js';
import { I18n } from './core/i18n.js';
const i18n = new I18n({});
i18n.list = {
    zh: {
        display: (date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${i18n.list.zh.displayWeeks[date.getDay()]}`,
        displayMonth: (date) => `${date.getFullYear()}年`,
        displayWeeks: ['日', '一', '二', '三', '四', '五', '六']
    },
    en: {
        display: (date) => `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}, Jan ${date.getDate()}`,
        displayMonth: (date) => `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()]} ${date.getFullYear()}`,
        displayWeeks: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
};
const name = 's-date';
const props = useProps({
    $value: '',
    $locale: '',
    $max: '2099-12-31',
    $min: '1900-01-01',
});
const style = /*css*/ `
:host{
  display: inline-block;
  vertical-align: middle;
  border-radius: 8px;
  font-size: .875rem;
  max-width: 360px;
  overflow: hidden;
  box-sizing: border-box;
  border: solid 1px var(--s-color-surface-variant, ${"#DCE4E8" /* Theme.colorSurfaceVariant */});
  background: var(--s-color-surface-container-low, ${"#F2F4F5" /* Theme.colorSurfaceContainerLow */});
  color: var(--s-color-on-surface, ${"#191C1E" /* Theme.colorOnSurface */});
}
.button,
.icon-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  box-sizing: border-box;
  font-size: .8125rem;
  color: var(--s-color-on-surface-variant, ${"#40484C" /* Theme.colorOnSurfaceVariant */});
}
.icon-button{
  width: 36px;
  border-radius: 50%;
}
.button{
  border-radius: 18px;
  height: 36px;
  padding: 0 12px;
}
svg{
  width: 24px;
  fill: currentColor;
  box-sizing: border-box;
}
.header{
  padding: 24px 24px 16px 24px;
  font-size: 1.25rem;
  border-bottom: solid 1px var(--s-color-surface-variant, ${"#DCE4E8" /* Theme.colorSurfaceVariant */});
  background: var(--s-color-surface-container, ${"#ECEEF0" /* Theme.colorSurfaceContainer */});
}
.container{
  display: flex;
  flex-direction: column;
  position: relative;
}
.action{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
.action>.year>svg{
  margin: 0 -8px 0 2px;
  padding: 1px;
}
.action>.toggle{
  display: flex;
}
.years{
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  gap: 4px;
  column-gap: 6px;
  padding: 0 16px 16px 16px;
  margin-top: -12px;
  max-height: 280px;
  counter-reset: year-counter 1899;
}
.years>.item{
  counter-increment: year-counter;
  flex-grow: 1;
}
.years>.item::before{
  content: counter(year-counter);
}
.weeks{
  display: flex;
  padding: 0 16px;
  font-size: .8125rem;
  color: var(--s-color-outline, ${"#70787D" /* Theme.colorOutline */});
}
.weeks>.item,
.days>.item{
  width: calc(100% / 7);
  display: inline-flex;
  justify-content: center;
}
.days{
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}
.days>.overflow~.item{
  display: none;
}
.days>.item>s-ripple{
  margin: 2px;
}
.days>.checked>s-ripple,
.years>.checked{
  pointer-events: none;
  background: var(--s-color-primary, ${"#006782" /* Theme.colorPrimary */});
  color: var(--s-color-on-primary, ${"#ffffff" /* Theme.colorOnPrimary */});
}
.container:not(.show-years) .years,
.show-years :is(.weeks, .days, .action>.toggle){
  display: none;
}
`;
const templateList = {
    years: [],
    weeks: [],
    days: [],
};
for (let i = 0; i < 200; i++) {
    if (i < 7)
        templateList.weeks.push(`<div class="item"></div>`);
    if (i < 31)
        templateList.days.push(`<div class="item"><s-ripple class="icon-button">${i + 1}</s-ripple></div>`);
    templateList.years.push(`<s-ripple class="button item"></s-ripple>`);
}
const template = /*html*/ `
<div class="header" part="header">
  <slot name="headline"></slot>
  <span></span>
</div>
<div class="container" part="container">
  <div class="action">
    <s-ripple class="button year" slot="trigger">
      <span></span>
      <svg viewBox="0 -960 960 960">
        <path d="M480-360 280-560h400L480-360Z"></path>
      </svg>
    </s-ripple>
    <div class="toggle">
      <s-ripple class="icon-button prev" part="prev-button">
        <svg viewBox="0 -960 960 960">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"></path>
        </svg>
      </s-ripple>
      <s-ripple class="icon-button next" part="next-button">
        <svg viewBox="0 -960 960 960">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"></path>
        </svg>
      </s-ripple>
    </div>
  </div>
  <s-scroll-view class="years">${templateList.years.join('')}</s-scroll-view>
  <div class="weeks">${templateList.weeks.join('')}</div>
  <div class="days">${templateList.days.join('')}</div>
</div>
`;
class DateState {
    yearSelect;
    daySelect;
    dayOverflow;
    date;
    min;
    max;
    constructor(date, min, max) {
        this.date = typeof date === 'string' ? new Date(date) : date;
        this.min = new Date(min);
        this.max = new Date(max);
    }
}
const getMonthMaxDate = (year, month) => {
    const date = new Date(year, month + 1, 1);
    date.setDate(date.getDate() - 1);
    return date.getDate();
};
const addLocale = (name, locale) => {
    i18n.addItem(name, locale);
};
const setLocale = (name) => {
    i18n.setLocale(name);
};
class DateElement extends useElement({
    style, template, props, methods: { addLocale, setLocale },
    setup(shadowRoot) {
        const container = shadowRoot.querySelector('.container');
        const headline = shadowRoot.querySelector('.header>span');
        const yearTogggle = shadowRoot.querySelector('.action>.year');
        const prev = shadowRoot.querySelector('.action>.toggle>.prev');
        const next = shadowRoot.querySelector('.action>.toggle>.next');
        const years = shadowRoot.querySelector('.years');
        const weeks = shadowRoot.querySelector('.weeks');
        const days = shadowRoot.querySelector('.days');
        const state = new DateState(this.value || new Date(), this.min, this.max);
        const setText = () => {
            const displayHeadline = i18n.getItem(this.locale).display;
            headline.textContent = displayHeadline(state.date);
            const displayMotnh = i18n.getItem(this.locale).displayMonth;
            yearTogggle.children[0].textContent = displayMotnh(state.date);
        };
        const setWeekText = () => {
            const displayWeeks = i18n.getItem(this.locale).displayWeeks;
            weeks.childNodes.forEach((item, index) => item.textContent = displayWeeks[index]);
        };
        const update = () => {
            const weekDay = new Date(state.date.getFullYear(), state.date.getMonth(), 1).getDay();
            days.children[0].setAttribute('style', `margin-left: calc((100% / 7) * ${weekDay})`);
            const monthDay = new Date(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate();
            state.dayOverflow?.classList.remove('overflow');
            state.dayOverflow = days.children[monthDay - 1];
            state.dayOverflow.classList.add('overflow');
            state.yearSelect?.classList.remove('checked');
            state.yearSelect = years.children[state.date.getFullYear() - state.min.getFullYear()];
            state.yearSelect.classList.add('checked');
            state.daySelect?.classList.remove('checked');
            state.daySelect = days.children[state.date.getDate() - 1];
            state.daySelect.classList.add('checked');
            container.style.removeProperty('height');
        };
        const setYearCount = () => {
            const count = state.max.getFullYear() - state.min.getFullYear();
            years.innerHTML = '';
            years.style.counterReset = `year-counter ${state.min.getFullYear() - 1}`;
            const fragment = document.createDocumentFragment();
            for (let i = 0; i <= count; i++) {
                const ripple = new Ripple();
                ripple.classList.add('button', 'item');
                fragment.appendChild(ripple);
            }
            years.appendChild(fragment);
            update();
        };
        const setValue = (y, m, d) => {
            this.value = dateFormat(new Date(y, m, d));
            this.dispatchEvent(new Event('change'));
        };
        yearTogggle.onclick = () => {
            const h = container.offsetHeight;
            container.classList.toggle('show-years');
            if (container.classList.contains('show-years')) {
                container.style.height = `${h}px`;
                state.yearSelect && years.scrollTo({ top: state.yearSelect.offsetTop - (years.offsetHeight / 2) + (state.yearSelect.offsetHeight / 2) });
                return;
            }
        };
        prev.onclick = () => {
            const prevMaxDate = getMonthMaxDate(state.date.getFullYear(), state.date.getMonth() - 1);
            const day = Math.min(state.date.getDate(), prevMaxDate);
            setValue(state.date.getFullYear(), state.date.getMonth() - 1, day);
        };
        next.onclick = () => {
            const prevMaxDate = getMonthMaxDate(state.date.getFullYear(), state.date.getMonth() + 1);
            const day = Math.min(state.date.getDate(), prevMaxDate);
            setValue(state.date.getFullYear(), state.date.getMonth() + 1, day);
        };
        years.onclick = (e) => {
            if (!(e.target instanceof Ripple))
                return;
            container.classList.remove('show-years');
            const index = Array.from(years.children).indexOf(e.target) + state.min.getFullYear();
            setValue(index, state.date.getMonth(), state.date.getDate());
        };
        days.onclick = (e) => {
            if (!(e.target instanceof Ripple))
                return;
            const index = Array.from(days.children).indexOf(e.target.parentElement) + 1;
            setValue(state.date.getFullYear(), state.date.getMonth(), index);
        };
        const updateText = () => {
            setText();
            setWeekText();
        };
        update();
        updateText();
        return {
            onMounted: () => i18n.updates.set(this, updateText),
            onUnmounted: () => i18n.updates.delete(this),
            min: (value) => {
                const min = new Date(value);
                if (isNaN(min.getTime()) || min.getTime() > state.date.getTime())
                    throw Error('invalid min date');
                state.min = min;
                setYearCount();
            },
            max: (value) => {
                const max = new Date(value);
                if (isNaN(max.getTime()) || max.getTime() < state.date.getTime())
                    throw Error('invalid max date');
                state.max = max;
                setYearCount();
            },
            value: {
                get: () => dateFormat(state.date),
                set: (value) => {
                    const val = new Date(value);
                    if (isNaN(val.getTime()) || val.getTime() < state.min.getTime() || val.getTime() > state.max.getTime())
                        throw Error('invalid date');
                    state.date = val;
                    setText();
                    update();
                }
            },
            locale: updateText,
        };
    }
}) {
}
DateElement.define(name);
export { DateElement as Date };
