import * as React from "react";
import { ProjectPage } from "../../components/ProjectPage";
import { Project } from "../../types/data";

interface Props {
    entry: any;
    widgetFor: any;
}

const ProjectPagePreview: React.SFC<Props> = ({ entry }) => {
    const project: Project = entry.getIn(["data"]).toJS();

    return <ProjectPage project={project} />;
};

export default ProjectPagePreview;
