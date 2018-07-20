import { Link } from "gatsby";
import * as React from "react";
import * as styles from "./OnwardJournies.module.scss";

interface Props {
    projectURL: string;
    style?: React.CSSProperties;
    className?: string;
}

export const OnwardJournies: React.SFC<Props> = ({
    projectURL,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <div>
            <h2>Like what you see?</h2>
            <a href={projectURL}>Launch project</a>
        </div>
        <div>
            <h2>Got a project in mind?</h2>
            <Link to="/contact-us">Contact us</Link>
        </div>
    </div>
);
export default OnwardJournies;
