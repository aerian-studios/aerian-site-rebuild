import * as React from "react";
import { ProjectPage } from "../../templates/project";

interface Props {
    entry: any;
    widgetFor: any;
}

const ProjectPagePreview: React.SFC<Props> = ({ entry, widgetFor }) => (
    <ProjectPage
        title={entry.getIn(["data", "title"])}
        content={widgetFor("body")}
        heroImage={entry.getIn(["data", "heroimage"])}
    />
);

export default ProjectPagePreview;
