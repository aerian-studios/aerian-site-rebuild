import classNames from "classnames";
import * as React from "react";

import * as styles from "./SlidingCarousel.module.scss";

export interface SliderProps extends React.ComponentPropsWithRef<React.FC> {
    interactionPreparation?: (event: React.WheelEvent) => void;
    style?: React.CSSProperties;
    // Infinite scrolling. Defaults to false
    infinite?: boolean;
    ref?: React.MutableRefObject<HTMLDivElement | null>;
}

/**
 * Duplicate React children with their props
 * @param {React.ReactNode} children - The elements to duplicate with props
 * @param {object} injectingProps - Properties to add to the children
 * @return {React.ReactNode[]} - Returns the duplicated children
 */
const createDuplicateChildren = (
    children: React.ReactNode,
    injectingProps?: {}
): React.ReactNode[] => {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child;
        }
        const childProps: React.PropsWithChildren<{
            children?: React.ReactNode;
        }> = {
            children: null,
            ...injectingProps
        };
        childProps.children = createDuplicateChildren(
            (child as React.ReactElement<{
                children?: React.ReactNode;
            }>).props.children
        );
        return React.cloneElement(child, childProps);
    });
};

/**
 * Sliding carousel Proper
 * @param {SliderProps} props - The FunctionalComponent props
 * @param {React.Ref<HTMLDivElement>} ref - The ref to forward
 * @returns {React.FC<SliderProps>} - SlidingCarousel Component
 */
export const SlidingCarousel: React.RefForwardingComponent<
    React.Ref<HTMLDivElement>,
    SliderProps
    // eslint-disable-next-line react/display-name
> = React.forwardRef((props: SliderProps, ref?: React.Ref<HTMLDivElement>) => {
    const { children, style, infinite = false, interactionPreparation } = props;

    return (
        <div
            className={classNames(styles.SCSliderWrapper)}
            style={style}
            onWheel={interactionPreparation}
        >
            <div className={classNames(styles.SCSlider)} ref={ref}>
                {infinite
                    ? createDuplicateChildren(children, {
                          "aria-hidden": "true",
                          tabIndex: 0
                      })
                    : null}
                {children}
                {infinite
                    ? createDuplicateChildren(children, {
                          "aria-hidden": "true",
                          tabIndex: 0
                      })
                    : null}
            </div>
        </div>
    );
});
export default SlidingCarousel;
