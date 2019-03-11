import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slide,
    Slider
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import * as React from "react";
import { Edge, ProjectBox } from "../../types/data";

import { SimpleHoverCard } from "../SimpleHoverCard";

import * as styles from "./SquareCarousel.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    data: Array<Edge<ProjectBox>>;
    children?: Array<React.ReactElement<any>>;
}

export const SquareCarousel: React.SFC<Props> = props => {
    // The next few lines are all about setting the carousel so that it displays the slides at slideSize
    const slideSize = 306;
    const calculateSlidesVisible = () => {
        const bodyWidth = document.body.clientWidth;
        return bodyWidth / slideSize;
    };
    const [visibleSlides, setSlides] = React.useState(calculateSlidesVisible());

    React.useEffect(() => {
        // Do we need a throttle here?
        window.addEventListener("resize", () => {
            setSlides(calculateSlidesVisible());
        });
        return () => {
            window.removeEventListener("resize", calculateSlidesVisible);
        };
    });

    return (
        <CarouselProvider
            naturalSlideWidth={slideSize}
            naturalSlideHeight={slideSize}
            totalSlides={props.data.length}
            visibleSlides={visibleSlides}
            className={styles.carouselWrapper}
        >
            <Slider>
                {props.data.map((projectNode, index) => {
                    const project = projectNode.node;

                    return (
                        <Slide index={index} key={project.slug}>
                            <SimpleHoverCard
                                project={project}
                                className={styles.card}
                            />
                        </Slide>
                    );
                })}
            </Slider>
            <ButtonBack
                className={classNames(styles.carouselControl, styles.left)}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    size="4x"
                    className={styles.arrowLeft}
                />
            </ButtonBack>
            <ButtonNext
                className={classNames(styles.carouselControl, styles.right)}
            >
                <FontAwesomeIcon
                    icon={faChevronRight}
                    size="4x"
                    className={styles.arrow}
                />
            </ButtonNext>
        </CarouselProvider>
    );
};
