// import classNames from "classnames";
import { Link } from "gatsby";
import * as React from "react";

import { Button } from "../Button";
import { Card } from "../Card";
import { Image } from "../Image";

import { ProjectBox } from "../../types/data";

// import * as revealCardStyles from "../RevealCard/RevealCard.module.scss";
import classNames from "classnames";
import * as styles from "./SimpleHoverCard.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLAnchorElement> {
    style?: React.CSSProperties;
    className?: string;
    project: ProjectBox;
}

export const SimpleHoverCard: React.SFC<Props> = ({
    children,
    style,
    className,
    project,
    ...rest
}) => (
    <Card>
        <Link
            to={`/our-work/project/${project.slug}`}
            className={classNames(className, styles.cardWrapper)}
            {...rest}
            style={style}
            aria-label={`Visit the ${project.client.name} project`}
        >
            <Image
                key={project.titleLineOne}
                alt={project.name}
                source={project.thumbnail}
                aria-hidden={true}
            />
            <div className={styles.cardContent} aria-hidden={true}>
                <h3>{project.client.name}</h3>
                <Button arrow={true} alternate={true} tabIndex={-1}>
                    View project
                </Button>
            </div>
        </Link>
    </Card>
);
export default SimpleHoverCard;
