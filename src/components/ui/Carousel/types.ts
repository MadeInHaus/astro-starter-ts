export type CarouselDirection = 'horizontal' | 'vertical';

export type CarouselProps = {
    items: any[];
    className?: string;
    itemClassName?: string;
};

export type CarouselOptions = {
    direction?: CarouselDirection;
    align?: 'start' | 'center';
    damping?: number;
    disableSnap?: boolean;
    enableVerticalScroll?: boolean;
    enableNavigationGestures?: boolean;
};
