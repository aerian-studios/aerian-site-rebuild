import classNames from "classnames";
import * as React from "react";

import { SliderProps, SlidingCarousel } from "./SlidingCarousel";

import * as styles from "./SlidingCarousel.module.scss";

interface Props extends SliderProps {
    className?: string;
    style?: React.CSSProperties;
    buttonBackContent?: React.ReactElement;
    buttonFwdContent?: React.ReactElement;
}
export const SlidingCarouselProvider: React.FC<Props> = ({
    children,
    className,
    style,
    buttonBackContent,
    buttonFwdContent,
    ...rest
}) => {
    return (
        <div
            className={classNames(className, styles.sliderProvider)}
            style={style}
        >
            <SlidingCarousel {...rest}>{children}</SlidingCarousel>
            {buttonBackContent ? <button>{buttonBackContent}</button> : null}
            {buttonFwdContent ? <button>{buttonFwdContent}</button> : null}
        </div>
    );
};
