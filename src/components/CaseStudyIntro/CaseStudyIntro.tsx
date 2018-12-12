import * as React from "react";
import Markdown from "react-markdown";
import { Project } from "../../types/data";
import { Button } from "../Button";
import * as styles from "./CaseStudyIntro.module.scss";

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
        <div>
            <span>Case study</span>
            <h2>{project.caseStudyTitle}</h2>
            <Markdown source={project.caseStudyText} />
            <Button arrow={true}>
                <a href={project.externalUrl}>Launch project</a>
            </Button>
        </div>
    </div>
);
export default CaseStudyIntro;
