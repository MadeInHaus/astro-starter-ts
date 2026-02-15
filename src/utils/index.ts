export function isPartiallyInViewport(element: HTMLElement) {
    const rect = getBoundingClientRectWithoutTransform(element);
    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth
    );
}

export function getBoundingClientRectWithoutTransform(element: HTMLElement) {
    let top = 0;
    let left = 0;
    let currentElement: HTMLElement | null = element;
    while (currentElement && currentElement.offsetParent) {
        top += currentElement.offsetTop;
        left += currentElement.offsetLeft;
        currentElement = currentElement.offsetParent as HTMLElement;
    }
    if (currentElement) {
        top += currentElement.offsetTop;
        left += currentElement.offsetLeft;
    }
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const viewportTop = top - scrollTop;
    const viewportLeft = left - scrollLeft;
    return new DOMRect(viewportLeft, viewportTop, width, height);
}
