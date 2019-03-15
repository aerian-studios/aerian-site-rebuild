import classNames from "classnames";
import * as React from "react";

import * as styles from "./SlidingCarousel.module.scss";

export interface SliderProps extends React.ComponentProps<React.FC> {
    style?: React.CSSProperties;
    wrapperClassName?: string;
    sliderClassName?: string;
    // Centre the slider on the central slide. Defaults to true
    center?: boolean;
    // Gap between items expects to have units as well
    itemGap?: string;
    // Infinite scrolling. Defaults to false
    infinite?: boolean;
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

/**
 * Duplicate React children with their props
 * @param {React.ReactNode} children - The elements to duplicate with props
 * @returns {React.ReactNode[]} - Returns the duplicated children
 */
const createDuplicateChildren = (
    children: React.ReactNode
): React.ReactNode[] =>
    React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }

        const childProps: React.PropsWithChildren<{
            children?: React.ReactNode;
        }> = {
            children: null
        };

        childProps.children = createDuplicateChildren(
            (child as React.ReactElement<{
                children?: React.ReactNode;
            }>).props.children
        );
        return React.cloneElement(child, childProps);
    });

/**
 * Sliding carousel Proper
 * @param {SliderProps} props - The FunctionalComponent props
 * @returns {React.FC} - SlidingCarousel Component
 */
export const SlidingCarousel: React.FC<SliderProps> = ({
    children,
    style,
    wrapperClassName,
    sliderClassName,
    center = true,
    infinite = false,
    itemGap = "0px"
}) => {
    let ticking = false; // used for some render optimisations
    let originalWidth = 1; // used largely in infinite scroll
    const sliderRef = React.useRef<HTMLDivElement>(null);

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
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (infinite) {
                    checkForLoop(lastScrollX);
                }
                ticking = false;
            });

            ticking = true;
        }
    };

    // HOOKS
    /**
     * Set some init code to workout original width
     */
    React.useLayoutEffect(() => {
        if (!infinite || !sliderRef || !sliderRef.current) {
            return;
        }
        originalWidth = sliderRef.current.scrollWidth / 3;
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
        };
    }, [sliderRef.current]);

    /**
     * Set some CSS variables based on props
     */
    React.useEffect(() => {
        setCSSVariable("--SCSnapAlign", center ? "center" : "start");
        setCSSVariable("--SCGridGap", itemGap);
    });

    return (
        <section
            className={classNames(styles.sliderWrapper, wrapperClassName)}
            style={style}
        >
            <div
                className={classNames(sliderClassName, styles.SCSlider)}
                ref={sliderRef}
            >
                {infinite ? createDuplicateChildren(children) : children}
                {children}
                {infinite ? createDuplicateChildren(children) : children}
            </div>
        </section>
    );
};
export default SlidingCarousel;
