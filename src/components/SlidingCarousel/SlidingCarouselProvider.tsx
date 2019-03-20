import classNames from "classnames";
import debounce from "debounce";
import * as React from "react";

import { SliderProps, SlidingCarousel } from "./SlidingCarousel";

import * as styles from "./SlidingCarousel.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}
export type ButtonRenderProp<P extends ButtonProps = ButtonProps> = (
    button: React.JSXElementConstructor<P>
) => React.ReactElement;

interface Props extends SliderProps {
    className?: string;
    style?: React.CSSProperties;
    buttonBackContentRender?: ButtonRenderProp;
    buttonFwdContentRender?: ButtonRenderProp;
    center?: boolean;
    infinite?: boolean;
    itemGap?: string;
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
    let originalWidth = 1; // used largely in infinite scroll
    let pageWidth = 200;
    let childSizes: Size[] = []; // a utitlity array for more speedy checking of child sizes
    let current = 0; // the current index

    const setCurrent = (newCurrent: number): number => {
        current = newCurrent !== current ? newCurrent : current;
        return current;
    };

    const centerThingsNearestToPosition = (positionToCentre?: number) => {
        if (!childSizes.length || !sliderRef || !sliderRef.current) {
            return;
        }

        const position =
            typeof positionToCentre !== "undefined"
                ? positionToCentre
                : sliderRef.current.scrollLeft;
        let scrollAmount = center ? -pageWidth * 0.5 : 0;
        let i = 0;
        let elW = 0;
        const gap = parseInt(itemGap, 10);

        // assume that the children have non-uniform widths
        while (scrollAmount < position) {
            elW = childSizes[i].width + gap;
            i++;
            if (i >= childSizes.length) {
                i = childSizes.length - 1;
                break;
            }

            scrollAmount += elW;
        }

        if (center) {
            scrollAmount -= elW * 0.5 + gap / 2;
        }

        if (i !== current) {
            setCurrent(i);
            sliderRef.current.scroll(scrollAmount, 0);
        }
    };

    const debouncedCentreThingsNearestToPosition = debounce(
        centerThingsNearestToPosition,
        800
    );

    const centerTheThingsToIndex = (indexToCentre?: number) => {
        if (!childSizes.length || !sliderRef || !sliderRef.current) {
            return;
        }

        const index = indexToCentre ? indexToCentre : current;
        let scrollAmount = 0;
        const gap = parseInt(itemGap, 10);

        for (let i = 0; i < index; i++) {
            const elW = childSizes[i].width + gap;

            scrollAmount += elW;

            if (center && i === index - 1) {
                scrollAmount -= elW * 0.5 + gap / 2;
                scrollAmount -= pageWidth * 0.5;
            }
        }

        sliderRef.current.scroll(scrollAmount, 0);

        if (index !== current) {
            setCurrent(index);
        }
    };

    const centerTheThings = () => {
        pageWidth = window.innerWidth;
        centerTheThingsToIndex(current);
    };

    const moveCarouselPage = (direction: number) => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }

        const currentPosition = sliderRef.current.scrollLeft;
        const visibleItems = childSizes.slice(current - 1, current + 1);
        let amountToScroll = 0;
        let w = pageWidth / 2 - visibleItems[1].width / 2;

        while (amountToScroll < w && visibleItems.length) {
            const itemIndex =
                visibleItems.length > 1
                    ? Math.ceil(visibleItems.length / 2)
                    : 0;

            const item = visibleItems.splice(itemIndex, 1);
            w = pageWidth / 2 - item[0].width / 2;
            amountToScroll += item[0].width;
        }

        // TODO: need to do a loop check here
        sliderRef.current.scroll(
            currentPosition + amountToScroll * direction,
            0
        );
    };

    /**
     * Method to check if the infinite scroll needs to loop
     * @param {number} position - the current scroll position
     * @return {void}
     */
    const checkForLoop = (position: number) => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }

        if (position < originalWidth) {
            sliderRef.current.style.scrollBehavior = "auto";
            sliderRef.current.scroll(position + originalWidth, 0);
            sliderRef.current.style.scrollBehavior = "smooth";
        } else if (position > originalWidth * 2) {
            sliderRef.current.style.scrollBehavior = "auto";
            sliderRef.current.scroll(position - originalWidth, 0);
            sliderRef.current.style.scrollBehavior = "smooth";
        }
    };

    /**
     * Handle scroll events by calling necessary checks
     * @param {Event} e Scroll event
     * @return {void}
     */
    const scrollHandler = (e: Event) => {
        if (!sliderRef || !sliderRef.current) {
            return;
        }
        const lastScrollX = sliderRef.current.scrollLeft;

        // tslint:disable-next-line
        if (!stillInFrame && infinite) {
            window.requestAnimationFrame(() => {
                checkForLoop(lastScrollX);
                stillInFrame = false;
            });

            stillInFrame = true;
        }

        debouncedCentreThingsNearestToPosition(lastScrollX);
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

        centerTheThingsToIndex(center ? Math.floor(childSizes.length / 2) : 0);
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
        window.addEventListener("resize", centerTheThings);

        return () => {
            window.removeEventListener("resize", centerTheThings);
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
    const fwdButton = buttonFwdContentRender
        ? buttonFwdContentRender(FwdButton)
        : null;
    const backButton = buttonBackContentRender
        ? buttonBackContentRender(BackButton)
        : null;

    return (
        <div
            className={classNames(className, styles.sliderProvider)}
            style={style}
        >
            <SlidingCarousel infinite={infinite} ref={sliderRef}>
                {children}
            </SlidingCarousel>
            {backButton}
            {fwdButton}
        </div>
    );
};
