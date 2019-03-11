import classNames from "classnames";
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
export const SquareCarousel: React.SFC<Props> = props => (
    <div
        className={classNames(styles.component, props.className)}
        style={props.style}
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
    </div>
);
