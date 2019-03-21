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

interface Size {
    width: number;
    height: number;
}

/**
 * Utility for setting CSS variables on the root node
 * @param {String} propertyName - String name of the CSS variable - e.g. --SCCardHeight
 * @param {String} propertyValue - value to set
 * @returns {void}
 */
const setCSSVariable = (propertyName: string, propertyValue: string): void => {
    const body = document.body;

    if (!body) {
        return;
    }

    body.style.setProperty(propertyName, propertyValue);
};

const workOutSizes = (nodes: HTMLCollection): Size[] => {
    const len = nodes.length;
    const ret: Size[] = [];

    if (len) {
        for (let i = 0; i < len; i++) {
            const el: Element = nodes[i];

            ret.push({ width: el.clientWidth, height: el.clientHeight });
        }
    }
    return ret;
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
    const sliderRef = React.useRef<HTMLDivElement>();
    let stillInFrame = false; // used for some render optimisations
    let originalWidth = 0; // used largely in infinite scroll
    let originalChildLength = 0; // used largely in infinite scroll
    let pageWidth = 200;
    let childSizes: Size[] = []; // a utitlity array for more speedy checking of child sizes
    let current = 0; // the current index
    let destination = 0; // destination in async functions

    const setCurrent = (newCurrent: number): number => {
        current = newCurrent !== current ? newCurrent : current;
        setCurrentFocus(current);

        return current;
    };

    const setCurrentFocus = (index: number): void => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        const childs = sliderRef.current.children;

        const focussable = childs[current].querySelector("a");
        // tslint:disable-next-line
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

        if (position < originalWidth) {
            loopCheck.position = position + originalWidth;
        } else if (position > originalWidth * 2) {
            loopCheck.position = position - originalWidth;
        }

        return loopCheck;
    };

    const alignThingsNearestToPosition = (position?: number) => {
        if (!childSizes.length || position === destination) {
            return;
        }

        destination = typeof position !== "undefined" ? position : destination;
        let scrollAmount = center ? -pageWidth * 0.5 : 0;
        let i = 0;
        let elW = 0;
        const gap = parseInt(itemGap, 10);

        // assume that the children have non-uniform widths
        while (scrollAmount < destination) {
            elW = childSizes[i].width + gap;
            i++;
            if (i === childSizes.length - 1) {
                break;
            }

            scrollAmount += elW;
        }

        if (center) {
            scrollAmount += elW * 0.5 + gap / 2;
        }

        if (i === current) {
            return;
        }
        destination = scrollAmount;
        setCurrent(i);
        scrollToPosition(scrollAmount);
    };

    const debouncedCentreThingsNearestToPosition = debounce(
        alignThingsNearestToPosition,
        400
    );

    const alignTheThingsToIndex = (indexToCentre?: number): void => {
        if (!childSizes.length) {
            return;
        }

        const index = indexToCentre ? indexToCentre : current;
        let scrollAmount = center ? -pageWidth * 0.5 : 0;
        let elW = 0;
        const gap = parseInt(itemGap, 10);

        for (let i = 0; i < index; i++) {
            elW = childSizes[i].width + gap;

            scrollAmount += elW;
        }

        if (center) {
            scrollAmount += elW * 0.5 + gap / 2;
        }

        // tslint:disable-next-line
        if (index !== current) {
            destination = scrollAmount;
            scrollToPosition(destination);
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
        pageWidth = window.innerWidth;
        alignTheThingsToIndex(current);
    };

    let deferDelay: any;
    let scrollDelay: any;
    const moveCarouselPage = (direction: number) => {
        // tslint:disable-next-line
        deferDelay && window.clearTimeout(deferDelay);
        // tslint:disable-next-line
        scrollDelay && window.clearTimeout(scrollDelay);

        const visibleItems = childSizes.slice(current - 1, current + 1);
        const gap = parseInt(itemGap, 10);
        let amountToScroll = 0;
        let w = (pageWidth - visibleItems[1].width) / 2;

        while (visibleItems.length && amountToScroll <= w) {
            const itemIndex =
                visibleItems.length > 1
                    ? Math.ceil(visibleItems.length / 2)
                    : 0;

            const item = visibleItems.splice(itemIndex, 1);

            // update page centre to item centre based on item width
            w = (pageWidth - item[0].width) / 2;
            amountToScroll += item[0].width / 2 + gap / 2;
        }

        // Check for loop before scrolling
        destination = destination + amountToScroll * direction;
        const destCheck = checkForLoop(destination);

        // disable the scroll centerer
        stillInFrame = true;

        if (destCheck.position) {
            destination = destCheck.position;
            const preDest = destination - amountToScroll * direction;
            scrollToPosition(preDest, true);
        }

        // Needs to defer this second scroll request
        deferDelay = window.setTimeout(() => {
            scrollToPosition(destination);
        }, 60);

        // wait until scroll complete before re-enabling scroll checking
        scrollDelay = window.setTimeout(() => {
            stillInFrame = false;
        }, 2000);
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

        debouncedCentreThingsNearestToPosition(lastX);
    };

    // HOOKS
    /**
     * Set some init code to workout original width and do any centring that needs to happen
     */
    React.useLayoutEffect(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        originalWidth = sliderRef.current.scrollWidth / 3;
        pageWidth = window.innerWidth;

        childSizes = workOutSizes(sliderRef.current.children);
        originalChildLength = infinite
            ? childSizes.length / 3
            : childSizes.length;

        // This also needs to be deferred :(|)
        window.setTimeout(() => {
            alignTheThingsToIndex(
                center ? Math.floor((childSizes.length - 1) / 2) : 0
            );
        }, 500);
    });

    /**
     * Add scroll cheking on slider
     */
    React.useEffect(() => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        // set scroll position to the middle
        sliderRef.current.scroll(originalWidth, 0);
        sliderRef.current.addEventListener("scroll", scrollHandler);

        // Remove the event listener on destroy
        return () => {
            // tslint:disable-next-line
            sliderRef.current &&
                sliderRef.current.removeEventListener("scroll", scrollHandler);
            debouncedCentreThingsNearestToPosition.clear();
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
                    <ol>
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
                                        <span className="visuallyhidden">
                                            {item}
                                        </span>{" "}
                                        {i !== current ? null : (
                                            <span className="visuallyhidden">
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
            className={classNames(className, styles.sliderProvider)}
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
                index={current}
                total={originalChildLength}
                pagerElementClick={alignTheThingsToIndex}
            />
        </section>
    );
};
