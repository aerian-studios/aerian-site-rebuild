import * as React from "react";
import * as styles from "./RevealCard.scss";

import { Link } from "gatsby";
import { Project } from "../../types/data";
import { Image } from "../Image";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    project: Project;
}

export const RevealCard: React.SFC<Props> = ({
    children,
    style,
    className,
    project
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <figure className={styles.bgImg}>
            <Image
                source={project.heroImage}
                className={styles.heroImage}
                alt="FEED ME"
            />
        </figure>
        <a
            href={"/our-work/project/" + project.slug}
            title={project.caseStudyTitle}
            className={styles.anchor}
        >
            <figure className={styles.clientLogo}>
                <Image
                    className={styles.promoLogo}
                    source={project.client.promoLogo}
                    // alt={throw new Error()}
                />
            </figure>
            <div className={styles.overlay}>
                <h3>{project.name}</h3>
                <button className={styles.button}>View project</button>
            </div>
        </a>
    </div>
);
export default RevealCard;
