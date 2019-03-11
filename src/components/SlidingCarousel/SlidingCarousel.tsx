import classNames from "classnames";
import * as React from "react";

import * as styles from "./SlidingCarousel.module.scss";

interface Props {
    style?: React.CSSProperties;
    wrapperClassName?: string;
    sliderClassName?: string;
    slideHeight?: number;
    slideWidth?: number;
    // Centre the slider on the central slide. Defaults to true
    centre?: boolean;
    // Infinite scrolling. Defaults to false
    infinite?: boolean;
}

const setCSSVariable = (propertyName: string, propertyValue: string): void => {
    const body = document.body;

    if (!body) {
        return;
    }

    body.style.setProperty(propertyName, propertyValue);
};

const defaultSlideSize = 306;
export const SlidingCarousel: React.SFC<Props> = ({
    children,
    style,
    wrapperClassName,
    sliderClassName,
    slideHeight = defaultSlideSize,
    slideWidth = defaultSlideSize,
    centre = true,
    infinite = false
}) => {
    const sliderRef = React.useRef(null);
    const setupCSS = () => {
        setCSSVariable("--SCSlideHeight", `${slideHeight}px`);
        setCSSVariable("--SCSlideWidth", `${slideWidth}px`);

        const bodyWidth = document.body.clientWidth;

        if (!bodyWidth) {
            return;
        }

        setCSSVariable(
            "--SCWidthInFrs",
            `${Math.ceil(bodyWidth / slideWidth) * slideWidth}px`
        );
    };

    const [scrollAmount, setScrollAmount] = React.useState(0);

    React.useEffect(() => {
        // Do we need a throttle here?
        window.addEventListener("resize", setupCSS);
        return () => {
            window.removeEventListener("resize", setupCSS);
        };
    });

    React.useEffect(() => {
        if (sliderRef && typeof sliderRef.current !== "undefined") {
            sliderRef.current.scroll(scrollAmount, 0);
        }
    }, [scrollAmount]);

    return (
        <section
            className={classNames(styles.sliderWrapper, wrapperClassName)}
            style={style}
        >
            <div
                className={classNames(sliderClassName, styles.SCSlider)}
                ref={sliderRef}
            >
                {children}
            </div>
        </section>
    );
};
export default SlidingCarousel;
