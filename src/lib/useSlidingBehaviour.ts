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
    tolerance = 2
): boolean => Math.abs(numberToCheck - checkWithNumber) > tolerance;

/**
 * Takes a HTMLCollection and returns an array of Sizes for the children
 */
export const workOutSizes = (nodes: HTMLCollection, gapSize = 0): Size[] => {
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

let supportsSmoothScroll: boolean | undefined;

export const checkSmoothScrollSupport = (): boolean => {
    if (typeof supportsSmoothScroll !== "undefined") {
        return supportsSmoothScroll;
    }
    const el = document.createElement("div");

    supportsSmoothScroll = typeof el.style.scrollBehavior !== "undefined";
    return supportsSmoothScroll;
};

export const calculateScreenAndSlideCenterToScreenLeft = (
    position = 0,
    index = 0,
    childSizes: Size[],
    center = 0
): { position: number; index: number } => {
    if (!center) {
        return { position, index };
    }

    return {
        position: position - center + childSizes[index].width * 0.5,
        index
    };
};

/**
 *
 * @param {number} center - The width to the center of the screen; use 0 for not centered
 * @param {number} currentIndex - The 0 based index of the current element
 * @param {array<Size>} childSizes - The array of element sizes
 */
export const calculateCenterOffsetFromScreenLeft = (
    center = 0,
    currentIndex: number,
    childSizes: Size[]
): number => {
    const elWidthDiff: number = center ? childSizes[currentIndex].width / 2 : 0;

    return center - elWidthDiff;
};

/**
 * Calculate a complete slide (or centre of slide) from an arbitrary number (left of scrolled element from left of screen)
 */
export const calculateNearestSnapPoint = (
    position = 0,
    childSizes: Size[],
    center = 0
): { position: number; index: number } => {
    if (!childSizes.length) {
        return calculateScreenAndSlideCenterToScreenLeft(
            0,
            0,
            childSizes,
            center
        );
    }

    const normalisedPosition = position + center;
    const len = childSizes.length;
    let newPosition = 0;
    let i = 0;

    for (; i < len; i++) {
        const elW = childSizes[i].width;
        const nextFullSlide = newPosition + elW - 1;

        if (
            normalisedPosition <= nextFullSlide &&
            normalisedPosition >= newPosition
        ) {
            break;
        } else {
            newPosition = nextFullSlide + 1;
        }
    }

    const res = calculateScreenAndSlideCenterToScreenLeft(
        newPosition,
        i,
        childSizes,
        center
    );

    return res;
};

/**
 * Calculate the width of the elements to align an index
 * It is dependant on whether the carousel is centered
 */
export const calculateScrollOffsetForIndex = (
    index = 0,
    childSizes: Size[],
    center = 0
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

    return (
        scrollAmount -
        calculateCenterOffsetFromScreenLeft(center, index, childSizes)
    );
};

const reducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    matchMedia(`(prefers-reduced-motion: reduce)`).matches;

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
    // eslint-disable-next-line complexity
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
        (newCurrent: number, setFocus = false): number => {
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
        (position: number | null, immediate = false): void => {
            if (!sliderRef.current || position === null) {
                return;
            }

            if (immediate) {
                sliderRef.current.style.scrollBehavior = "auto";
            }

            sliderRef.current.scroll(position, 0);
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

            const nearestSnap = calculateNearestSnapPoint(
                newDestination,
                childSizes.current,
                center ? pageWidth.current * 0.5 : 0
            );

            scrollToPosition(nearestSnap.position);
            setCurrent(nearestSnap.index);
        },
        [center, scrollToPosition, setCurrent]
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

            // eslint-disable-next-line react-hooks/exhaustive-deps
            stillInFrame = true;
        }

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
        (indexToAlign?: number, immediate = false): void => {
            const index = indexToAlign || currentIndex;

            if (!childSizes.current.length) {
                return;
            }
            const scrollAmount = calculateScrollOffsetForIndex(
                index,
                childSizes.current,
                center ? pageWidth.current * 0.5 : 0
            );

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
