// import classNames from "classnames";
import { Link } from "gatsby";
import * as React from "react";

import { Button } from "../Button";
import { Card } from "../Card";
import { Image } from "../Image";

import { ProjectBox } from "../../types/data";

// import * as revealCardStyles from "../RevealCard/RevealCard.module.scss";
import * as styles from "./SquareCard.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    project: ProjectBox;
}

export const SquareCard: React.SFC<Props> = ({
    children,
    style,
    className,
    project
}) => (
    <Card>
        <Link
            to={`/our-work/project/${project.slug}`}
            className={styles.cardWrapper}
        >
            <Image
                key={project.titleLineOne}
                alt={project.name}
                source={project.thumbnail}
                aria-hidden={true}
            />
            <div className={styles.cardContent}>
                <h3>{project.client.name}</h3>
                <Button arrow={true} alternate={true} tabIndex={-1}>
                    View project
                </Button>
            </div>
        </Link>
    </Card>
);
export default SquareCard;
