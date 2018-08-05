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

export const isSmoothScrollSupported =
    "scrollBehavior" in document.documentElement.style;

const doScrolling = (destY: number, duration: number) => {
    if (isSmoothScrollSupported) {
        window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: destY
        });

        return;
    }

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

let scrollPos: number;
const defaultTiming = 300;
let topMargin = 0;

export const setTopMargin = (margin: number) => {
    topMargin = margin;
};

export const momoizeCurrentScrollPos = () => {
    scrollPos = documentVerticalScrollPosition();

    return scrollPos;
};

export const scrollToElement = (
    element?: HTMLElement,
    time: number = defaultTiming
) => {
    if (element) {
        const elementY = element.offsetTop - topMargin;

        doScrolling(elementY, time);
        return;
    }

    if (typeof scrollPos !== "undefined") {
        doScrolling(scrollPos, time);
        return;
    }

    return;
};
