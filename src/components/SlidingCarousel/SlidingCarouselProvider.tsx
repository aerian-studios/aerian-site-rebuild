import classNames from "classnames";

import * as React from "react";
import uuid from "uuid";
import { useSlidingBehaviour } from "../../lib/useSlidingBehaviour";

import { SlidingCarousel } from "./SlidingCarousel";

import * as styles from "./SlidingCarousel.module.scss";

export type ButtonRenderProp<
    P extends React.HTMLAttributes<HTMLButtonElement> = React.HTMLAttributes<
        HTMLButtonElement
    >
> = (button: React.JSXElementConstructor<P>) => React.ReactElement;

interface Props extends React.HTMLAttributes<HTMLElement> {
    carouselLabel: string | React.ReactElement;
    buttonBackContentRender?: ButtonRenderProp;
    buttonFwdContentRender?: ButtonRenderProp;
    center?: boolean;
    infinite?: boolean;
    itemGap?: string;
    className?: string;
    style?: React.CSSProperties;
}

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
    const {
        sliderRef,
        triggerCarouselPage,
        currentIndex,
        setCurrent,
        toggleScrollChecking,
        normalisedIndex,
        childCount
    } = useSlidingBehaviour(children, itemGap, center, infinite);

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
                total={childCount}
                pagerElementClick={setCurrent}
            />
        </section>
    );
};
