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

export const checkNumberExceedsTolerance = (
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
    let prevW = 0;
    // loop through and add up all the widths
    while (scrollAmount <= position && i < childSizes.length) {
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

    // scrollposition is for the left of the screen and left of the slide
    // so calculate how many full slides fit in and add the current half slide
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

        // Need to increment the index for centred
        i++;
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
        (position: number, immediate: boolean = false): void => {
            if (!sliderRef || !sliderRef.current) {
                return;
            }

            if (immediate) {
                sliderRef.current.style.scrollBehavior = "auto";
            }
            RAF.current = window.requestAnimationFrame(() => {});

            sliderRef.current && sliderRef.current.scroll(position, 0);

            if (immediate) {
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

            if (currentIndex === nearestSnap.index) {
                scrollToPosition(nearestSnap.scrollAmount);
            } else {
                setCurrent(nearestSnap.index);
            }
        },
        [center, currentIndex, scrollToPosition, setCurrent]
    );

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

        if (!disableScrollLoopChecking.current && !stillInFrame && infinite) {
            window.requestAnimationFrame(() => {
                const check = checkForLoop(lastX);

                if (check.position) {
                    scrollToPosition(check.position, true);
                }
                stillInFrame = false;
            });

            // eslint-disable-next-line react-hooks/exhaustive-deps
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

            scrollToPosition(scrollAmount, immediate);
        },
        [currentIndex, center, scrollToPosition]
    );

    const toggleScrollChecking = React.useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
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
            setCurrent(validCurrent, true);
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
    React.useEffect(() => {
        if (!sliderRef.current) {
            return;
        }

        const slider = sliderRef.current;

        slider.addEventListener("scroll", scrollHandler);

        // Remove the event listener on destroy
        return () => {
            // tslint:disable-next-line no-unused-expression
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

    const FwdButton: React.FC<
        React.HTMLAttributes<HTMLButtonElement>
    > = props => {
        const paginationClick = React.useCallback(event => {
            event.stopPropagation();

            triggerCarouselPage(1);
        }, []);

        return (
            <button
                aria-hidden="true"
                tabIndex={-1}
                {...props}
                onClick={paginationClick}
            />
        );
    };
    const BackButton: React.FC<
        React.HTMLAttributes<HTMLButtonElement>
    > = props => {
        const paginationClick = React.useCallback(event => {
            event.stopPropagation();

            triggerCarouselPage(-1);
        }, []);

        return (
            <button
                aria-hidden="true"
                tabIndex={-1}
                {...props}
                onClick={paginationClick}
            />
        );
    };

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

    const normalisedIndex =
        currentIndex > originalChildLength.current
            ? currentIndex - originalChildLength.current
            : currentIndex;
    return (
        <section
            className={classNames(className, styles.SCSliderProvider)}
            style={style}
            {...regionLabel}
        >
            {typeof carouselLabel === "string" ? null : carouselLabel}
            <SlidingCarousel
                infinite={infinite}
                ref={sliderRef}
                interactionPreparation={toggleScrollChecking}
            >
                {children}
            </SlidingCarousel>
            {backButton}
            {fwdButton}
            <SliderProgressTracker
                index={normalisedIndex}
                total={originalChildLength.current}
                pagerElementClick={setCurrent}
            />
        </section>
    );
};
