export type CarouselProps = {
    items: any[];
    className?: string;
    itemClassName?: string;
};

export type CarouselOptions = {
    align?: 'start' | 'center';
    damping?: number;
    disableSnap?: boolean;
    enableVerticalScroll?: boolean;
    enableNavigationGestures?: boolean;
};
