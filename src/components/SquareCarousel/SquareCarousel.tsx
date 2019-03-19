import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import * as React from "react";
import { Edge, ProjectBox } from "../../types/data";

import { SimpleHoverCard } from "../SimpleHoverCard";
import { SlidingCarouselProvider } from "../SlidingCarousel";

import * as styles from "./SquareCarousel.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    data: Array<Edge<ProjectBox>>;
    children?: Array<React.ReactElement<any>>;
}

const workOutWindowOffset = (offsetUnit: number): number => {
    const winW = window.innerWidth;
    if (winW <= 1050) {
        return 60;
    }

    return offsetUnit - (Math.ceil(winW / offsetUnit) * offsetUnit - winW) / 2;
};

export const SquareCarousel: React.FC<Props> = props => {
    const [buttonOffset, setButtonOffset] = React.useState(0);

    const getButtonOffsets = () => {
        setButtonOffset(workOutWindowOffset(307));
    };

    React.useLayoutEffect(() => {
        getButtonOffsets();
    });

    React.useEffect(() => {
        window.addEventListener("resize", getButtonOffsets);

        return () => {
            window.removeEventListener("resize", getButtonOffsets);
        };
    });

    return (
        <SlidingCarouselProvider
            className={styles.carouselWrapper}
            infinite={true}
            itemGap="2px"
            buttonBackContentRender={BackButton => (
                <BackButton
                    className={classNames(styles.carouselControl, styles.left)}
                    style={{ width: `${buttonOffset}px` }}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="4x"
                        style={{ strokeWidth: "25px", stroke: "currentColor" }}
                    />
                </BackButton>
            )}
            buttonFwdContentRender={FwdButton => (
                <FwdButton
                    className={classNames(styles.carouselControl, styles.right)}
                    style={{ width: `${buttonOffset}px` }}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="4x"
                        style={{ strokeWidth: "25px", stroke: "currentColor" }}
                    />
                </FwdButton>
            )}
        >
            {props.data.map((projectNode, index) => {
                const project = projectNode.node;

                return (
                    <SimpleHoverCard
                        key={project.slug}
                        project={project}
                        className={styles.card}
                    />
                );
            })}
        </SlidingCarouselProvider>
    );
};
