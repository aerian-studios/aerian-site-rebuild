import * as React from "react";

import { ProjectStage } from "../../types/data";
import { BlockHeader } from "../BlockHeader";
import { GroupThree } from "../GroupThree";
import { HurdleBlock } from "../HurdleBlock";
import * as styles from "./ProjectStageBlock.module.scss";

interface Props {
    style?: React.CSSProperties;
    className?: string;
    projectStage: ProjectStage;
    title: string;
}

export const ProjectStageBlock: React.SFC<Props> = ({
    projectStage,
    title,
    style,
    className
}) => (
    <div className={[styles.component, className].join(" ")} style={style}>
        <BlockHeader title={title} text={projectStage.description} />
        <GroupThree>
            {projectStage.hurdles.map(hurdle => (
                <HurdleBlock key={hurdle.title} hurdle={hurdle} />
            ))}
        </GroupThree>
    </div>
);
export default ProjectStageBlock;
