export const documentVerticalScrollPosition = () => {
    if (self.pageYOffset) {
        return self.pageYOffset;
    } // Firefox, Chrome, Opera, Safari.
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    } // Internet Explorer 6 (standards mode).
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    } // Internet Explorer 6, 7 and 8.
    return 0; // None of the above.
};

const doScrolling = (destY: number, duration: number) => {
    const startY = documentVerticalScrollPosition();
    const diff = destY - startY;
    let startTime: number;

    const scrollTick = (timestamp: number) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const time = timestamp - startTime;
        const percent = Math.min(time / duration, 1);

        window.scrollTo(0, startY + diff * percent);

        if (time < duration) {
            window.requestAnimationFrame(scrollTick);
        }
    };

    window.requestAnimationFrame(scrollTick);
};

export const scrollToElement = (element: HTMLElement) => {
    if (!element) {
        return;
    }
    const elementY = element.getBoundingClientRect().top;

    doScrolling(elementY, 300);
};
