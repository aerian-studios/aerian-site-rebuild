import * as React from "react";

import { Project } from "../../types/data";
// import { Image } from "../Image";
import * as styles from "./RevealCard.scss";
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
        <div className="overlay">
            {/* this will have the dark transparent background */}
            <div className="content">
                <h3>{project.name}</h3>
                <a className={styles.button} href={project.slug}>
                    View more
                </a>
                {/* <Image source={project.client.promoLogo} /> */}
            </div>
        </div>
    </div>
);
export default RevealCard;
