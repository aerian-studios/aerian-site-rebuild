import * as React from "react";
import debounce from "debounce";

export interface Size {
    width: number;
    height: number;
}
export interface LoopCheck {
    position: number | null;
}

/**
 * Utility for setting CSS variables on the root node
 */
export const setCSSVariable = (
    propertyName: string,
    propertyValue: string
): void => {
    const body = document.body;

    if (!body) {
        return;
    }

    body.style.setProperty(propertyName, propertyValue);
};

/**
 * Compare a number against another with a tollerance
 */
export const checkNumberExceedsTolerance = (
    numberToCheck: number,
    checkWithNumber: number,
    tolerance: number = 2
): boolean => Math.abs(numberToCheck - checkWithNumber) > tolerance;

/**
 * Takes a HTMLCollection and returns an array of Sizes for the children
 */
export const workOutSizes = (
    nodes: HTMLCollection,
    gapSize: number = 0
): Size[] => {
    const len = nodes.length;
    const ret: Size[] = [];

    if (len) {
        for (let i = 0; i < len; i++) {
            const el: Element = nodes[i];

            ret.push({
                width: el.clientWidth + gapSize,
                height: el.clientHeight + gapSize
            });
        }
    }
    return ret;
};

export const calculateCenterSnapDiff = (
    position: number = 0,
    index: number = 0,
    childSizes: Size[],
    center: number = 0
): { position: number; index: number } => {
    if (!center) {
        return { position, index };
    }
    // scrollposition is for the left of the screen and left of the slide
    // so calculate how many full slides fit in and add the current half slide
    let centerDiff = 0;
    let currW = 0;
    let i = Math.min(Math.max(index, 0), childSizes.length - 1);
    while (centerDiff < center) {
        currW = childSizes[i].width;
        const nextFullSlide = centerDiff + currW / 2;
        i++;

        if (center <= nextFullSlide) {
            break;
        } else {
            centerDiff += currW;
        }

        if (i > childSizes.length - 1) {
            i = 0;
        }
    }
    const offsetDiff = centerDiff - center;
    const diff = currW * 0.5 - offsetDiff;
    console.log({ centerDiff, i, offsetDiff, diff });

    return { position: position - diff, index };
};

/**
 * Calculate a complete slide (or centre of slide) from an arbitrary number
 */
export const calculateNearestSnapPoint = (
    position: number = 0,
    childSizes: Size[],
    center: number = 0
): { position: number; index: number } => {
    if (!childSizes.length) {
        return { position: 0, index: 0 };
    }

    let scrollAmount = 0;
    let i = 0;
    let prevW = 0;

    // loop through and add up all the widths
    while (scrollAmount < position && i < childSizes.length) {
        const elW = childSizes[i].width;
        const nextFullSlide = scrollAmount + elW / 2;

        if (position <= nextFullSlide) {
            break;
        } else {
            scrollAmount += prevW;
            prevW = elW;
            i++;
        }
    }

    i = Math.min(i, childSizes.length);

    console.log("calculateNearestSnapPoint i", i);

    return calculateCenterSnapDiff(scrollAmount, i, childSizes, center);
};

/**
 * Calculate the width of the elements to align an index
 * It is dependant on whether the carousel is centered
 */
export const calculateScrollOffsetForIndex = (
    index: number = 0,
    childSizes: Size[],
    center: number = 0
): number => {
    if (!childSizes || !childSizes.length) {
        return 0;
    }

    let scrollAmount = 0;
    let elW = childSizes[0].width;
    let prevW = 0;

    for (let i = 0; i <= index; i++) {
        elW = childSizes[i].width;
        scrollAmount += prevW;
        prevW = elW;
    }

    scrollAmount -= center;
    if (center) {
        scrollAmount += elW * 0.5;
    }

    console.log("calculateScrollOffsetForIndex", { scrollAmount, index });
    console.log(
        "calculateNearestSnapPoint",
        calculateNearestSnapPoint(scrollAmount, childSizes, center)
    );

    return scrollAmount;
};

/**
 * Calculate the index of the slide that intersects with a position, consistently 1 less
 */
export const calculateIndexFromPosition = (
    position: number = 0,
    childSizes: Size[],
    center: number = 0
): number => {
    if (!childSizes.length) {
        return 0;
    }

    let scrollAmount = 0;
    let i = 0;
    let prevW = 0;

    // loop through and add up all the widths
    while (scrollAmount < position && i < childSizes.length) {
        const elW = childSizes[i].width;

        if (i > 0) {
            scrollAmount += prevW;
        }

        i++;
        prevW = elW;
    }

    i = Math.min(Math.max(i - 1, 0), childSizes.length);

    return i;
};

const reducedMotion = matchMedia(`(prefers-reduced-motion: reduce)`).matches;

export const useSlidingBehaviour = (
    children: React.ReactNode,
    itemGap: string,
    center: boolean,
    infinite: boolean
): {
    sliderRef: React.RefObject<HTMLElement>;
    triggerCarouselPage: (direction: 1 | -1) => void;
    currentIndex: number;
    setCurrent: (index: number) => void;
    normalisedIndex: number;
    toggleScrollChecking: (event: React.MouseEvent | undefined) => void;
    childCount: number;
} => {
    let stillInFrame = false; // used for some render optimisations
    // Used to report progress
    const originalChildLength = React.useRef<number>(
        children ? (children as React.ReactNodeArray).length : 0
    );
    const checkForIndexLoop = React.useCallback(
        (destIndex: number): number => {
            const max =
                -1 +
                (infinite
                    ? originalChildLength.current * 2
                    : originalChildLength.current);
            const min = infinite ? originalChildLength.current : 0;

            if (destIndex > max) {
                return destIndex - originalChildLength.current;
            }

            if (destIndex < min) {
                return destIndex + originalChildLength.current;
            }

            return destIndex;
        },
        [infinite]
    );
    const [currentIndex, setCurrentIndex] = React.useState<number>(
        infinite
            ? center
                ? Math.floor(originalChildLength.current * 1.5)
                : originalChildLength.current
            : center
            ? Math.floor(originalChildLength.current * 0.5)
            : 0
    );
    const sliderRef = React.useRef<HTMLDivElement | null>(null);
    // Used in calculating scroll etc
    const originalWidth = React.useRef<number>(0);
    const pageWidth = React.useRef<number>(240);
    // a utitlity array for more speedy checking of child sizes
    const childSizes = React.useRef([] as Size[]);
    // switch to prevent scroll loop checking
    const disableScrollLoopChecking = React.useRef<boolean>(false);

    /**
     * Method to check if the infinite scroll needs to loop
     * @param {number} position - the current scroll position
     * @return {LoopCheck} - A position of either `null` for no loop need or an adjusted position number that doesn't need to loop
     */
    const checkForLoop = React.useCallback((position: number): LoopCheck => {
        if (disableScrollLoopChecking.current) {
            return { position: null };
        }
        const lastChildWidth =
            childSizes.current[originalChildLength.current - 1].width;
        const firstChildWidth = childSizes.current[0].width;

        const max = originalWidth.current * 2 + firstChildWidth;
        const min = originalWidth.current - lastChildWidth;

        if (position > max && checkNumberExceedsTolerance(position, max, 30)) {
            const newPosition = position - originalWidth.current;

            return { position: newPosition };
        }

        if (position < min && checkNumberExceedsTolerance(position, min, 30)) {
            const newPosition = position + originalWidth.current;
            return { position: newPosition };
        }

        return { position: null };
    }, []);

    const setCurrentFocus = React.useCallback(
        (index: number = currentIndex || 0): void => {
            if (!sliderRef.current || !sliderRef.current.children) {
                return;
            }

            const childs = sliderRef.current.children;
            const focussable = childs[index].querySelector("a");

            // tslint:disable:no-unused-expression
            focussable && focussable.focus();
        },
        [currentIndex]
    );

    const setCurrent = React.useCallback(
        (newCurrent: number, setFocus: boolean = false): number => {
            if (setFocus) {
                setCurrentFocus(newCurrent);
            }

            setCurrentIndex(newCurrent);
            return newCurrent;
        },
        [setCurrentFocus]
    );

    const RAF = React.useRef<number>();
    const scrollToPosition = React.useCallback(
        // eslint-disable-next-line complexity
        (position: number | null, immediate: boolean = false): void => {
            if (!sliderRef.current || position === null) {
                return;
            }

            if (immediate) {
                sliderRef.current.style.scrollBehavior = "auto";
            }
            RAF.current = window.requestAnimationFrame(() => {
                console.log("scrolling", { position });

                sliderRef.current && sliderRef.current.scroll(position, 0);
            });

            if (immediate && !reducedMotion) {
                sliderRef.current.style.scrollBehavior = "smooth";
            }
        },
        []
    );

    const alignThingsNearestToPosition = React.useCallback(
        (position?: number) => {
            const newDestination =
                typeof position !== "undefined" ? position : 0;
            if (!childSizes.current.length) {
                return;
            }
            console.log("alignThingsNearestToPosition", position);

            const nearestSnap = calculateNearestSnapPoint(
                newDestination,
                childSizes.current,
                center ? pageWidth.current * 0.5 : 0
            );

            console.log(nearestSnap);

            if (currentIndex === nearestSnap.index) {
                scrollToPosition(nearestSnap.position);
            } else {
                setCurrent(nearestSnap.index);
            }
        },
        [center, currentIndex, scrollToPosition, setCurrent]
    );

    const debouncedCentreThingsNearestToPosition = debounce(
        alignThingsNearestToPosition,
        300
    );

    /**
     * Handle scroll events by calling necessary checks
     * @return {void}
     */
    const scrollHandler = React.useCallback((): void => {
        if (!sliderRef.current || !infinite) {
            return;
        }
        const lastX = sliderRef.current.scrollLeft;

        if (!disableScrollLoopChecking.current && !stillInFrame) {
            window.requestAnimationFrame(() => {
                const check = checkForLoop(lastX);

                scrollToPosition(check.position, true);
                stillInFrame = false;
            });

            stillInFrame = true;
        }

        // this is the left of the slider
        console.log("want to align to", lastX);

        debouncedCentreThingsNearestToPosition(lastX);
    }, [scrollToPosition, debouncedCentreThingsNearestToPosition]);

    const calculateChildSizes = React.useCallback(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }

        childSizes.current = workOutSizes(
            sliderRef.current.children,
            parseInt(itemGap, 10)
        );

        originalWidth.current =
            childSizes.current.reduce(
                (prev, current) => prev + current.width,
                0
            ) / 3;
    }, [itemGap]);

    const alignTheThingsToIndex = React.useCallback(
        (indexToAlign?: number, immediate: boolean = false): void => {
            const index = indexToAlign || currentIndex;

            if (!childSizes.current.length) {
                return;
            }
            const scrollAmount = calculateScrollOffsetForIndex(
                index,
                childSizes.current,
                center ? pageWidth.current * 0.5 : 0
            );

            console.log("aligning..", scrollAmount);

            scrollToPosition(scrollAmount, immediate);
        },
        [center, currentIndex, scrollToPosition]
    );

    const toggleScrollChecking = React.useCallback(
        (event: React.MouseEvent | undefined) => {
            event && event.stopPropagation();
            disableScrollLoopChecking.current = false;
        },
        []
    );

    const triggerCarouselPage = React.useCallback(
        (direction: 1 | -1) => {
            disableScrollLoopChecking.current = true;
            const newCurrent = currentIndex + direction;
            const validCurrent = checkForIndexLoop(newCurrent);

            // pre-loop so that the re-render doesn't have to
            if (validCurrent !== newCurrent) {
                alignTheThingsToIndex(validCurrent + direction * -1, true);
            }
            setCurrent(validCurrent, false);
        },
        [alignTheThingsToIndex, checkForIndexLoop, currentIndex, setCurrent]
    );

    const alignTheThingsToPageWidth = React.useCallback(() => {
        pageWidth.current = window.outerWidth;
        alignTheThingsToIndex(currentIndex);
    }, [currentIndex, alignTheThingsToIndex]);

    /**
     * Set some init code to workout original width and do any centring that needs to happen
     */
    React.useLayoutEffect(() => {
        if (!sliderRef.current) {
            return;
        }

        pageWidth.current = window.outerWidth;
        calculateChildSizes();
        setCSSVariable("--SCSnapAlign", center ? "center" : "start");
        setCSSVariable("--SCGridGap", itemGap);
    }, [calculateChildSizes, center, itemGap]);

    /**
     * Scroll to initial position
     */
    React.useEffect(() => {
        console.log(
            "!!!!!!!!!!!!!!!!!!!!!!!!",
            { currentIndex },
            sliderRef.current.scrollLeft
        );

        alignTheThingsToIndex(currentIndex);
    }, [currentIndex, alignTheThingsToIndex]);

    /**
     * Add scroll checking on slider
     */
    React.useEffect((): (() => void) => {
        if (!sliderRef.current) {
            return () => {};
        }

        const slider = sliderRef.current;

        slider.addEventListener("scroll", scrollHandler);

        // Remove the event listener on destroy
        return (): void => {
            slider.removeEventListener("scroll", scrollHandler);
            debouncedCentreThingsNearestToPosition.clear();
            RAF.current && cancelAnimationFrame(RAF.current);
        };
    }, [currentIndex, debouncedCentreThingsNearestToPosition, scrollHandler]);

    React.useEffect(() => {
        window.addEventListener("resize", alignTheThingsToPageWidth);

        return () => {
            window.removeEventListener("resize", alignTheThingsToPageWidth);
        };
    }, [alignTheThingsToPageWidth]);

    const normalisedIndex = (currentIndex % originalChildLength.current) + 1;

    return {
        sliderRef,
        triggerCarouselPage,
        currentIndex,
        setCurrent,
        normalisedIndex,
        toggleScrollChecking,
        childCount: originalChildLength.current
    };
};
