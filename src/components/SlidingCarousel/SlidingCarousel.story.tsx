import * as React from "react";
import classNames from "classnames";

import { storiesOf } from "@storybook/react";

import { SlidingCarouselProvider } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { SimpleHoverCard } from "../SimpleHoverCard";
import { projectBox } from "../../types/fixtures";

import styles from "../SquareCarousel/SquareCarousel.module.scss";
import { workOutWindowOffset } from "../SquareCarousel/SquareCarousel";

const getButtonOffsets = () => {
    return workOutWindowOffset(308);
};

storiesOf("SlidingCarousel", module)
    .add("Default", () => (
        <SlidingCarouselProvider
            carouselLabel="More of our work"
            className="sut"
            itemGap="2px"
            buttonBackContentRender={BackButton => (
                <BackButton>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="4x"
                        style={{ strokeWidth: "25px", stroke: "currentColor" }}
                    />
                </BackButton>
            )}
            buttonFwdContentRender={FwdButton => (
                <FwdButton>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="4x"
                        style={{ strokeWidth: "25px", stroke: "currentColor" }}
                    />
                </FwdButton>
            )}
        >
            {[projectBox, projectBox, projectBox, projectBox, projectBox].map(
                projectNode => {
                    const project = projectNode;

                    return (
                        <SimpleHoverCard
                            key={project.slug}
                            project={project}
                            role="group"
                            aria-roledescription="slide"
                        />
                    );
                }
            )}
        </SlidingCarouselProvider>
    ))
    .add("Centered and Infinite", () => (
        <SlidingCarouselProvider
            carouselLabel="More of our work"
            className="sut"
            infinite={true}
            center={true}
            itemGap="2px"
            buttonBackContentRender={BackButton => (
                <BackButton
                    className={classNames(styles.carouselControl, styles.left)}
                    style={{ width: `${getButtonOffsets()}px` }}
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
                    style={{ width: `${getButtonOffsets()}px` }}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="4x"
                        style={{ strokeWidth: "25px", stroke: "currentColor" }}
                    />
                </FwdButton>
            )}
        >
            {[projectBox, projectBox, projectBox, projectBox, projectBox].map(
                projectNode => {
                    const project = projectNode;

                    return (
                        <SimpleHoverCard
                            key={project.slug}
                            project={project}
                            className={styles.card}
                            role="group"
                            aria-roledescription="slide"
                        />
                    );
                }
            )}
        </SlidingCarouselProvider>
    ));
