import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import * as React from "react";
import { Edge, ProjectBox } from "../../types/data";

import { SimpleHoverCard } from "../SimpleHoverCard";
import { SlidingCarousel, SlidingCarouselProvider } from "../SlidingCarousel";

import * as styles from "./SquareCarousel.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    data: Array<Edge<ProjectBox>>;
    children?: Array<React.ReactElement<any>>;
}

export const SquareCarousel: React.FC<Props> = props => {
    return (
        <SlidingCarouselProvider
            className={styles.carouselWrapper}
            wrapperClassName={styles.carouselWrapper}
            infinite={true}
            itemGap="2px"
            buttonBackContent={
                <FontAwesomeIcon icon={faChevronRight} size="4x" />
            }
            buttonFwdContent={
                <FontAwesomeIcon icon={faChevronRight} size="4x" />
            }
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
