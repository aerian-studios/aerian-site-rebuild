import { graphql } from "gatsby";
import * as React from "react";

import Layout from "../components/Layout";
import { ProjectPage } from "../components/ProjectPage";
import { Project, ReactRouterLocation } from "../types/data";

interface TemplateProps {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    projectsJson: Project;
}

export const ProjectTemplate: React.SFC<TemplateProps> = ({
    data,
    location
}) => (
    <Layout location={location} title={data.projectsJson.titleLineOne}>
        <ProjectPage project={data.projectsJson} />
    </Layout>
);

export const ProjectQuery = graphql`
    query project($id: String!) {
        projectsJson(id: { eq: $id }) {
            ...Project
        }
    }
`;
export default ProjectTemplate;
