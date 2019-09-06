import classNames from "classnames";
import debounce from "debounce";
import * as React from "react";
import uuid from "uuid";

import { SliderProps, SlidingCarousel } from "./SlidingCarousel";

import * as styles from "./SlidingCarousel.module.scss";

export type ButtonRenderProp<
    P extends React.HTMLAttributes<HTMLButtonElement> = React.HTMLAttributes<
        HTMLButtonElement
    >
> = (button: React.JSXElementConstructor<P>) => React.ReactElement;

interface LoopCheck {
    position: number | null;
}

interface Props extends SliderProps {
    carouselLabel: string | React.ReactElement;
    buttonBackContentRender?: ButtonRenderProp;
    buttonFwdContentRender?: ButtonRenderProp;
    center?: boolean;
    infinite?: boolean;
    itemGap?: string;
    className?: string;
    style?: React.CSSProperties;
}

export interface Size {
    width: number;
    height: number;
}

/**
 * Utility for setting CSS variables on the root node
 * @param {String} propertyName - String name of the CSS variable - e.g. --SCCardHeight
 * @param {String} propertyValue - value to set
 * @returns {void}
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

export const checkNumberGreaterThanTolerance = (
    numberToCheck: number,
    checkWithNumber: number,
    tolerance: number = 2
): boolean => Math.abs(numberToCheck - checkWithNumber) > tolerance;

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

        if (i > 0) {
            scrollAmount += prevW;
        }

        prevW = elW;
    }

    scrollAmount -= center;
    if (center) {
        scrollAmount += elW * 0.5;
    }

    return scrollAmount;
};

export const calculateNearestSnapPoint = (
    position: number = 0,
    childSizes: Size[],
    center: number = 0
): { scrollAmount: number; index: number } => {
    if (!childSizes.length) {
        return { scrollAmount: 0, index: 0 };
    }

    let scrollAmount = 0;
    let i = 0;
    let elW: number;
    let prevW = 0;
    let prevAmount: number = scrollAmount;

    // loop through and add up all the widths
    while (scrollAmount < position && i < childSizes.length) {
        elW = childSizes[i].width;
        prevAmount = scrollAmount;

        if (i > 0) {
            scrollAmount += prevW;
        }
        const diff: number = scrollAmount - position;
        const nextSnap: boolean = position < scrollAmount + elW / 2;

        if (diff <= 0 && !nextSnap) {
            i++;
        }
        prevW = elW;
    }

    i = Math.min(i, childSizes.length);

    if (Math.abs(prevAmount - position) < Math.abs(scrollAmount - position)) {
        scrollAmount = prevAmount;
    }

    // @todo: add for optimisation add to the above loop and/or split out into function
    if (center) {
        let centerDiff = 0;
        let currW = 0;
        let ii = Math.max(i - 1, 0);

        while (centerDiff < center) {
            currW = childSizes[ii].width;
            centerDiff += currW;
            ii++;
            if (ii > childSizes.length - 1) {
                ii = 0;
            }
        }

        const offsetDiff = centerDiff - center;
        const diff = currW * 0.5 - offsetDiff;

        scrollAmount -= diff;
    }

    return { scrollAmount, index: i };
};

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

export const SlidingCarouselProvider: React.FC<Props> = ({
    carouselLabel,
    children,
    className,
    style,
    buttonBackContentRender,
    buttonFwdContentRender,
    center = true,
    infinite = false,
    itemGap = "0px"
}) => {
    let stillInFrame = false; // used for some render optimisations
    // Used to report progress
    const originalChildLength = React.useRef<number>(
        children ? (children as React.ReactElement[]).length : 0
    );
    const checkForIndexLoop = React.useCallback(
        (destIndex: number): number => {
            const max = infinite
                ? originalChildLength.current * 2 - 1
                : originalChildLength.current - 1;
            const min = infinite ? originalChildLength.current : 0;

            if (destIndex >= max) {
                return destIndex - min;
            }

            if (destIndex < min) {
                return destIndex + min;
            }

            return destIndex;
        },
        [infinite]
    );
    // const currentIndex = React.useRef<number>(0); // the current index
    const [currentIndex, setCurrentIndex] = React.useState<number>(
        checkForIndexLoop(
            infinite
                ? center
                    ? Math.floor(originalChildLength.current * 1.5)
                    : originalChildLength.current
                : center
                ? Math.floor(originalChildLength.current * 0.5)
                : 0
        )
    );

    const sliderRef = React.useRef<HTMLDivElement>();
    // destination in async functions
    const destination = React.useRef<number>(0);

    // Used in calculating scroll etc
    const originalWidth = React.useRef<number>(0);
    const pageWidth = React.useRef<number>(240);

    // a utitlity array for more speedy checking of child sizes
    const childSizes = React.useRef([] as Size[]);

    /**
     * Method to check if the infinite scroll needs to loop
     * @param {number} position - the current scroll position
     * @return {LoopCheck} - A position of either `null` for no loop need or an adjusted position number that doesn't need to loop
     */
    const checkForLoop = (position: number): LoopCheck => {
        const max = originalWidth.current * 2;
        const min = originalWidth.current;
        let newPosition;

        if (
            position > max &&
            checkNumberGreaterThanTolerance(position, max, 3)
        ) {
            newPosition = position - min;
            return { position: newPosition };
        }

        if (
            position < min &&
            checkNumberGreaterThanTolerance(position, min, 3)
        ) {
            newPosition = position + min;
            return { position: newPosition };
        }

        return { position: null };
    };

    // let deferDelay: any;
    // let scrollDelay: any;
    // const moveCarouselPage = (direction: number) => {
    //     // tslint:disable:no-unused-expression
    //     // deferDelay && window.clearTimeout(deferDelay);
    //     // tslint:disable:no-unused-expression
    //     // scrollDelay && window.clearTimeout(scrollDelay);

    //     const start = currentIndex ? currentIndex - 1 : 0;
    //     const end = currentIndex ? start + 1 : start + 2;
    //     const visibleItems = childSizes.current.slice(start, end);
    //     const w = pageWidth.current / 2;
    //     let itemWidths = 0;
    //     let indices = 0;
    //     // @todo: extract this into getVisibleItemsPerPage or somethign
    //     while (visibleItems.length && itemWidths <= w) {
    //         const itemIndex =
    //             visibleItems.length > 1
    //                 ? Math.ceil(visibleItems.length / 2)
    //                 : 0;

    //         const item = visibleItems.splice(itemIndex, 1);

    //         // update page centre to item centre based on item width
    //         itemWidths += item[0].width;
    //         indices++;
    //     }
    //     const destIndex = indices * direction + currentIndex;
    //     const newIndex = checkForIndexLoop(destIndex);

    //     setFocus = true;
    //     alignTheThingsToIndex(newIndex);

    //     if (destIndex !== newIndex) {
    //         setFocus = true;
    //     }

    //     // Check for loop before scrolling
    //     destination.current = destination.current + amountToScroll * direction;
    //     const destCheck = checkForLoop(destination.current);

    //     // disable the scroll centerer
    //     stillInFrame = true;

    //     if (destCheck.position) {
    //         destination.current = destCheck.position;
    //         const preDest = destination.current - amountToScroll * direction;
    //         scrollToPosition(preDest, true);
    //     }

    //     // Needs to defer this second scroll request
    //     deferDelay = window.setTimeout(() => {
    //         scrollToPosition(destination.current);
    //     }, 60);

    //     // wait until scroll complete before re-enabling scroll checking
    //     scrollDelay = window.setTimeout(() => {
    //         stillInFrame = false;
    //     }, 2000);
    // };

    const setCurrentFocus = React.useCallback(
        (index: number = currentIndex): void => {
            if (
                !sliderRef ||
                !sliderRef.current ||
                !sliderRef.current.children
            ) {
                return;
            }
            const childs = sliderRef.current.children;

            const focussable = childs[currentIndex].querySelector("a");
            // tslint:disable:no-unused-expression
            focussable && focussable.focus();
        },
        [currentIndex]
    );

    const setCurrent = React.useCallback(
        (newCurrent: number, setFocus: boolean = false): void => {
            console.log({ newCurrent, setFocus, currentIndex });

            if (newCurrent === currentIndex) {
                return;
            }
            console.log({ newCurrent, setFocus });

            if (setFocus) {
                setCurrentFocus(newCurrent);
            }
            setCurrentIndex(newCurrent);
        },
        [currentIndex, setCurrentFocus]
    );

    const scrollToPosition = React.useCallback(
        (position: number, immediate: boolean = false): void => {
            if (!sliderRef || !sliderRef.current) {
                return;
            }

            if (immediate) {
                sliderRef.current.style.scrollBehavior = "auto";
            }
            sliderRef.current.scroll(position, 0);

            if (immediate) {
                sliderRef.current.style.scrollBehavior = "smooth";
            }
        },
        [sliderRef]
    );

    const alignThingsNearestToPosition = (position?: number) => {
        const newDestination =
            typeof position !== "undefined" ? position : destination.current;
        if (
            !childSizes.current.length ||
            newDestination === destination.current
        ) {
            return;
        }

        destination.current = newDestination;
        const nearestSnap = calculateNearestSnapPoint(
            newDestination,
            childSizes.current,
            center ? pageWidth.current * 0.5 : 0
        );

        if (
            !checkNumberGreaterThanTolerance(
                newDestination,
                nearestSnap.scrollAmount
            )
        ) {
            return;
        }

        destination.current = nearestSnap.scrollAmount;
        setCurrent(nearestSnap.index);
        scrollToPosition(nearestSnap.scrollAmount);
    };

    const debouncedCentreThingsNearestToPosition = debounce(
        alignThingsNearestToPosition,
        500
    );

    /**
     * Handle scroll events by calling necessary checks
     * @return {void}
     */
    const scrollHandler = React.useCallback((): void => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        const lastX = sliderRef.current.scrollLeft;

        if (!stillInFrame && infinite) {
            window.requestAnimationFrame(() => {
                const check = checkForLoop(lastX);

                if (check.position) {
                    scrollToPosition(check.position, true);
                }
                stillInFrame = false;
            });

            stillInFrame = true;
        }

        // this is the left of the slider
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
    }, [itemGap]);

    const moveCarouselPage = React.useCallback(
        (direction: 1 | -1) => {
            console.log(currentIndex + direction);

            setCurrent(currentIndex + direction, true);
        },
        [currentIndex, setCurrent]
    );

    const alignTheThingsToIndex = React.useCallback(
        (indexToAlign?: number): void => {
            const index = indexToAlign || currentIndex;
            if (!childSizes.current.length || index === currentIndex) {
                return;
            }
            const scrollAmount = calculateScrollOffsetForIndex(
                index,
                childSizes.current,
                center ? pageWidth.current * 0.5 : 0
            );

            destination.current = scrollAmount;
            scrollToPosition(destination.current);
            setCurrent(index);
        },
        [currentIndex, destination, center, scrollToPosition, setCurrent]
    );

    const alignTheThings = React.useCallback(() => {
        pageWidth.current = window.outerWidth;
        alignTheThingsToIndex(currentIndex);
    }, [currentIndex, alignTheThingsToIndex]);

    /**
     * Set some init code to workout original width and do any centring that needs to happen
     */
    React.useLayoutEffect(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        originalWidth.current = sliderRef.current.scrollWidth / 3;
        pageWidth.current = window.outerWidth;
        calculateChildSizes();
        setCSSVariable("--SCSnapAlign", center ? "center" : "start");
        setCSSVariable("--SCGridGap", itemGap);
    }, [calculateChildSizes, center, itemGap]);

    /**
     * Scroll to initial position
     */
    React.useEffect(() => {
        const scrollAmount = calculateScrollOffsetForIndex(
            currentIndex,
            childSizes.current,
            center ? pageWidth.current * 0.5 : 0
        );

        destination.current = scrollAmount;
        scrollToPosition(destination.current, true);
    }, [
        center,
        setCurrent,
        scrollToPosition,
        checkForIndexLoop,
        infinite,
        pageWidth,
        currentIndex
    ]);

    /**
     * Add scroll checking on slider
     */
    React.useEffect(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        console.log("!!!!!!!!!!!!!!!!!!!!!!!", { currentIndex });

        // // set scroll position to the middle
        // sliderRef.current.scroll(originalWidth.current, 0);
        sliderRef.current.addEventListener("scroll", scrollHandler);

        // Remove the event listener on destroy
        return () => {
            console.log("vvvvvvvvvvvvvv");
            // tslint:disable:no-unused-expression
            sliderRef.current &&
                sliderRef.current.removeEventListener("scroll", scrollHandler);
            debouncedCentreThingsNearestToPosition.clear();
            // tslint:disable:no-unused-expression
            // deferDelay && window.clearTimeout(deferDelay);
            // tslint:disable:no-unused-expression
            // scrollDelay && window.clearTimeout(scrollDelay);
        };
    }, [currentIndex, debouncedCentreThingsNearestToPosition, scrollHandler]);

    React.useEffect(() => {
        window.addEventListener("resize", alignTheThings);

        return () => {
            window.removeEventListener("resize", alignTheThings);
        };
    }, [alignTheThings]);

    const FwdButton: React.SFC<
        React.HTMLAttributes<HTMLButtonElement>
    > = props => (
        <button
            aria-hidden="true"
            tabIndex={-1}
            {...props}
            onClick={() => {
                moveCarouselPage(1);
            }}
        />
    );
    const BackButton: React.SFC<
        React.HTMLAttributes<HTMLButtonElement>
    > = props => (
        <button
            aria-hidden="true"
            tabIndex={-1}
            {...props}
            onClick={() => {
                moveCarouselPage(-1);
            }}
        />
    );

    interface SliderProgressTrackerProps
        extends React.AllHTMLAttributes<HTMLElement> {
        index: number;
        total: number;
        itemTitles?: string[];
        PagerElement?: React.JSXElementConstructor<{
            current: boolean;
            children: JSX.Element;
        }>;
        pagerElementClick: (index: number) => void;
    }
    const SliderProgressTracker: React.SFC<SliderProgressTrackerProps> = ({
        index,
        total,
        itemTitles,
        PagerElement,
        pagerElementClick
    }) => {
        return (
            <div>
                <p
                    className={styles.SCProgressFraction}
                    aria-live="polite"
                    aria-atomic="true"
                >{`Item ${index} of ${total}`}</p>
                {PagerElement && itemTitles ? (
                    <ol className={styles.SCPagerWrapper}>
                        {itemTitles.map((item, i) => (
                            <li
                                className={classNames(styles.SCPagerElement)}
                                key={item}
                            >
                                <PagerElement current={i === currentIndex}>
                                    <button
                                        onClick={() => {
                                            pagerElementClick(i);
                                        }}
                                    >
                                        <span className="visually-hidden">
                                            {item}
                                        </span>{" "}
                                        {i !== currentIndex ? null : (
                                            <span className="visually-hidden">
                                                (Current item)
                                            </span>
                                        )}
                                    </button>
                                </PagerElement>
                            </li>
                        ))}
                    </ol>
                ) : null}
            </div>
        );
    };

    const fwdButton = buttonFwdContentRender
        ? buttonFwdContentRender(FwdButton)
        : null;
    const backButton = buttonBackContentRender
        ? buttonBackContentRender(BackButton)
        : null;
    const uniqueId = uuid();
    const regionLabel =
        typeof carouselLabel === "string"
            ? { "aria-label": carouselLabel }
            : { "aria-labelledby": uniqueId };

    return (
        <section
            className={classNames(className, styles.SCSliderProvider)}
            style={style}
            {...regionLabel}
        >
            {typeof carouselLabel === "string" ? null : carouselLabel}
            <SlidingCarousel infinite={infinite} ref={sliderRef}>
                {children}
            </SlidingCarousel>
            {backButton}
            {fwdButton}
            <SliderProgressTracker
                index={originalChildLength.current > 0 ? currentIndex + 1 : 0}
                total={originalChildLength.current}
                pagerElementClick={setCurrent}
            />
        </section>
    );
};
