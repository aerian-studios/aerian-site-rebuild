import * as React from "react";

import { Link } from "gatsby";
import { Project } from "../../types/data";
import * as styles from "./CaseStudyIntro.scss";

interface Props {
    project: Project;
    style?: React.CSSProperties;
    className?: string;
}

export const CaseStudyIntro: React.SFC<Props> = ({
    project,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <h3>Case study</h3>
        <h2>{project.caseStudyTitle}</h2>
        <p>{project.caseStudyText}</p>
        <a href={project.externalUrl}>Launch project</a>
    </div>
);
export default CaseStudyIntro;
