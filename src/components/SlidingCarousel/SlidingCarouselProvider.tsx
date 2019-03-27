import classNames from "classnames";
import debounce from "debounce";
import * as React from "react";
import uuid from "uuid";

import { SliderProps, SlidingCarousel } from "./SlidingCarousel";

import * as styles from "./SlidingCarousel.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}
export type ButtonRenderProp<P extends ButtonProps = ButtonProps> = (
    button: React.JSXElementConstructor<P>
) => React.ReactElement;

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
    if (!childSizes.length) {
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
): number => {
    if (!childSizes.length) {
        return 0;
    }

    let scrollAmount = 0;
    let i = 0;
    let elW = childSizes[0].width;
    let prevW = 0;
    let prevAmount = scrollAmount;

    while (scrollAmount < position && i < childSizes.length) {
        elW = childSizes[i].width;
        prevAmount = scrollAmount;

        if (i > 0) {
            scrollAmount += prevW;
        }

        i++;
        prevW = elW;
    }

    if (Math.abs(prevAmount - position) < Math.abs(scrollAmount - position)) {
        scrollAmount = prevAmount;
    }
    scrollAmount -= center;
    if (center) {
        scrollAmount += elW * 0.5;
    }

    return scrollAmount;
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

    const setCurrent = (newCurrent: number): void => {
        // alignTheThingsToIndex(current);
        if (newCurrent === current) {
            return;
        }

        setCurrentIndex(newCurrent);
        setCurrentFocus(current);
    };

    const setCurrentFocus = (index: number): void => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        const childs = sliderRef.current.children;

        const focussable = childs[current].querySelector("a");
        // tslint:disable:no-unused-expression
        focussable && focussable.focus();
    };

    interface LoopCheck {
        position: number | null;
    }
    /**
     * Method to check if the infinite scroll needs to loop
     * @param {number} position - the current scroll position
     * @return {LoopCheck} - A position of either `null` for no loop need or an adjusted position number that doesn't need to loop
     */
    const checkForLoop = (position: number): LoopCheck => {
        const loopCheck: LoopCheck = { position: null };

        if (position < originalWidth.current) {
            loopCheck.position = position + originalWidth.current;
        } else if (position > originalWidth.current * 2) {
            loopCheck.position = position - originalWidth.current;
        }

        return loopCheck;
    };

    const alignThingsNearestToPosition = (position?: number) => {
        if (!childSizes.current.length || position === destination.current) {
            return;
        }

        destination.current =
            typeof position !== "undefined" ? position : destination.current;
        const scrollAmount = calculateNearestSnapPoint(
            destination.current,
            childSizes.current,
            center ? pageWidth.current * 0.5 : 0
        );

        // destination = scrollAmount;
        // setCurrent(i);
        scrollToPosition(scrollAmount);
    };

    const debouncedCentreThingsNearestToPosition = debounce(
        alignThingsNearestToPosition,
        500
    );

    const alignTheThingsToIndex = (indexToAlign?: number): void => {
        if (!childSizes.current.length) {
            return;
        }

        const index = indexToAlign ? indexToAlign : current;
        // const scrollAmount = calculateScrollOffsetForIndex(
        //     index,
        //     childSizes.current,
        //     center ? pageWidth.current * 0.5 : 0
        // );

        // tslint:disable:early-exit
        if (index !== current) {
            // destination.current = scrollAmount;
            // scrollToPosition(destination.current);
            setCurrent(index);
        }
    };

    const scrollToPosition = (
        position: number,
        immediate: boolean = false
    ): void => {
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
    };

    const alignTheThings = () => {
        pageWidth.current = window.outerWidth;
        alignTheThingsToIndex(current);
    };

    // let deferDelay: any;
    // let scrollDelay: any;
    const moveCarouselPage = (direction: number) => {
        // tslint:disable:no-unused-expression
        // deferDelay && window.clearTimeout(deferDelay);
        // tslint:disable:no-unused-expression
        // scrollDelay && window.clearTimeout(scrollDelay);

        const start = current ? current - 1 : 0;
        const end = current ? start + 1 : start + 2;
        const visibleItems = childSizes.current.slice(start, end);

        console.log({ childSizes, visibleItems });
        let itemWidths = 0;
        const w = pageWidth.current / 2;
        let indices = 0;

        while (visibleItems.length && itemWidths <= w) {
            const itemIndex =
                visibleItems.length > 1
                    ? Math.ceil(visibleItems.length / 2)
                    : 0;

            const item = visibleItems.splice(itemIndex, 1);

            // update page centre to item centre based on item width
            itemWidths += item[0].width;
            indices++;
        }

        alignTheThingsToIndex(current + indices * direction);

        // // Check for loop before scrolling
        // destination.current = destination.current + amountToScroll * direction;
        // const destCheck = checkForLoop(destination.current);

        // // disable the scroll centerer
        // stillInFrame = true;

        // if (destCheck.position) {
        //     destination.current = destCheck.position;
        //     const preDest = destination.current - amountToScroll * direction;
        //     scrollToPosition(preDest, true);
        // }

        // Needs to defer this second scroll request
        // deferDelay = window.setTimeout(() => {
        //     scrollToPosition(destination.current);
        // }, 60);

        // // wait until scroll complete before re-enabling scroll checking
        // scrollDelay = window.setTimeout(() => {
        //     stillInFrame = false;
        // }, 2000);
    };

    /**
     * Handle scroll events by calling necessary checks
     * @return {void}
     */
    const scrollHandler = (): void => {
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

        // debouncedCentreThingsNearestToPosition(lastX);
    };

    // HOOKS
    const [current, setCurrentIndex] = React.useState(0); // the current index
    const sliderRef = React.useRef<HTMLDivElement>();
    // destination in async functions
    const destination = React.useRef<number>(0);

    // Used in calculating scroll etc
    const originalWidth = React.useRef<number>(0);
    const pageWidth = React.useRef<number>(240);

    // a utitlity array for more speedy checking of child sizes
    const childSizes = React.useRef([] as Size[]);

    const [originalChildLength, setOriginalChildLength] = React.useState(0);
    const calculateChildSizes = React.useCallback(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }

        childSizes.current = workOutSizes(
            sliderRef.current.children,
            parseInt(itemGap, 10)
        );

        const childLength = infinite
            ? childSizes.current.length / 3
            : childSizes.current.length;

        if (childLength !== originalChildLength) {
            setOriginalChildLength(childLength);
        }
    }, [sliderRef, sliderRef.current, itemGap]);
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

        // This also needs to be deferred :(|)
        const timer = setTimeout(() => {
            alignTheThingsToIndex(
                center ? Math.floor((childSizes.current.length - 1) / 2) : 0
            );
        }, 500);

        return () => clearTimeout(timer);
    });

    /**
     * Add scroll cheking on slider
     */
    React.useEffect(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        // // set scroll position to the middle
        // sliderRef.current.scroll(originalWidth.current, 0);
        sliderRef.current.addEventListener("scroll", scrollHandler);

        // Remove the event listener on destroy
        return () => {
            // tslint:disable:no-unused-expression
            sliderRef.current &&
                sliderRef.current.removeEventListener("scroll", scrollHandler);
            debouncedCentreThingsNearestToPosition.clear();
            // tslint:disable:no-unused-expression
            // deferDelay && window.clearTimeout(deferDelay);
            // tslint:disable:no-unused-expression
            // scrollDelay && window.clearTimeout(scrollDelay);
        };
    }, [sliderRef.current]);

    React.useEffect(() => {
        window.addEventListener("resize", alignTheThings);

        return () => {
            window.removeEventListener("resize", alignTheThings);
        };
    });

    /**
     * Set some CSS variables based on props
     */
    React.useEffect(() => {
        setCSSVariable("--SCSnapAlign", center ? "center" : "start");
        setCSSVariable("--SCGridGap", itemGap);
    });

    const FwdButton: React.SFC<ButtonProps> = props => (
        <button
            aria-hidden="true"
            tabIndex={-1}
            {...props}
            onClick={() => {
                if (!sliderRef || !sliderRef.current) {
                    return;
                }

                moveCarouselPage(1);
            }}
        />
    );
    const BackButton: React.SFC<ButtonProps> = props => (
        <button
            aria-hidden="true"
            tabIndex={-1}
            {...props}
            onClick={() => {
                if (!sliderRef || !sliderRef.current) {
                    return;
                }

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
                                <PagerElement current={i === current}>
                                    <button
                                        onClick={() => {
                                            pagerElementClick(i);
                                        }}
                                    >
                                        <span className="visually-hidden">
                                            {item}
                                        </span>{" "}
                                        {i !== current ? null : (
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
                index={originalChildLength > 0 ? current + 1 : 0}
                total={originalChildLength > 0 ? originalChildLength + 1 : 0}
                pagerElementClick={setCurrent}
            />
        </section>
    );
};
