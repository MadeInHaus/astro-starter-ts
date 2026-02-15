import { clamp } from '@madeinhaus/utils';
import type { CarouselDirection } from './types';

export type CSSValues = {
    gap: number;
    snap: number;
    snapStart: number;
    snapEnd: number;
    width: number;
    autoScroll: number;
    autoAdvance: number;
    autoAdvanceDelay: number;
    autoAdvanceDuration: number;
    disabled: boolean;
};

export function getCSSValues(container: HTMLElement, direction: CarouselDirection): CSSValues {
    const GAP = '--carousel-gap';
    const SNAP = '--carousel-snap-position';
    const SNAPSTART = '--carousel-snap-position-start';
    const SNAPEND = '--carousel-snap-position-end';
    const SIZE = '--carousel-item-size';
    const WIDTH = '--carousel-item-width';
    const SCROLL = '--carousel-autoscroll';
    const ADVANCE = '--carousel-autoadvance';
    const ADVANCEDELAY = '--carousel-autoadvance-delay';
    const ADVANCEDURATION = '--carousel-autoadvance-duration';
    const DISABLED = '--carousel-disabled';
    const styles = [
        `width: 100%`,
        `padding-left: var(${GAP})`,
        `padding-right: var(${SNAP})`,
        `margin-left: var(${SNAPSTART})`,
        `margin-right: var(${SNAPEND})`,
        `left: var(${SIZE}, ${WIDTH})`, // --carousel-item-width is deprecated
        `transition-delay: var(${ADVANCEDELAY})`,
        `transition-duration: var(${ADVANCEDURATION})`,
    ];
    const isHorizontal = direction === 'horizontal';
    const containerSize = isHorizontal ? container.offsetWidth : container.offsetHeight;
    const dummy = document.createElement('div');
    dummy.setAttribute('style', styles.join(';'));
    const dummyContainer = document.createElement('div');
    dummyContainer.setAttribute('style', `position: absolute; width: ${containerSize}px`);
    dummyContainer.appendChild(dummy);
    container.appendChild(dummyContainer);
    const computed = getComputedStyle(dummy);
    const hasSnapStart = computed.getPropertyValue(SNAPSTART) !== '';
    const hasSnapEnd = computed.getPropertyValue(SNAPEND) !== '';
    const gap = parseFloat(computed.getPropertyValue('padding-left'));
    const snap = parseFloat(computed.getPropertyValue('padding-right'));
    const snapStart = parseFloat(computed.getPropertyValue('margin-left'));
    const snapEnd = parseFloat(computed.getPropertyValue('margin-right'));
    const width = parseFloat(computed.getPropertyValue('left'));
    const autoScroll = parseFloat(computed.getPropertyValue(SCROLL));
    const autoAdvance = parseInt(computed.getPropertyValue(ADVANCE), 10);
    const autoAdvanceDelay = parseTime(computed.getPropertyValue('transition-delay'), 5000);
    const autoAdvanceDuration = parseTime(computed.getPropertyValue('transition-duration'), 700);
    const disabled = parseInt(computed.getPropertyValue(DISABLED), 10);
    container.removeChild(dummyContainer);
    return {
        gap: Math.max(Number.isFinite(gap) ? gap : 0, 0),
        snap: Number.isFinite(snap) ? snap : 0,
        snapStart: hasSnapStart && Number.isFinite(snapStart) ? snapStart : snap,
        snapEnd: hasSnapEnd && Number.isFinite(snapEnd) ? snapEnd : snap,
        width: Math.max(Number.isFinite(width) ? width : 0, 0),
        autoScroll: Number.isFinite(autoScroll) ? autoScroll : 0,
        autoAdvance: Number.isFinite(autoAdvance) ? autoAdvance : 0,
        autoAdvanceDelay,
        autoAdvanceDuration,
        disabled: (Number.isFinite(disabled) ? disabled : 0) !== 0,
    };
}

function parseTime(value: string, defaultValue: number): number {
    const match = value?.trim()?.match(/([0-9.]+)(ms|s)/);
    if (match) {
        const num = parseFloat(match[1]);
        if (Number.isFinite(num) && num !== 0) {
            const unit = match[2];
            if (unit === 'ms') {
                return num;
            } else if (unit === 's') {
                return num * 1000;
            }
        }
    }
    return defaultValue;
}

export function hermite(
    time: number,
    from: number = 0,
    to: number = 1,
    timeStart: number = 0,
    timeEnd: number = 1
): number {
    time = clamp(time, timeStart, timeEnd);
    const t = (time - timeStart) / (timeEnd - timeStart);
    return (-2 * t * t * t + 3 * t * t) * (to - from) + from;
}
