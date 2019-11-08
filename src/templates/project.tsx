import { graphql } from "gatsby";
import * as React from "react";

import Layout from "../components/Layout";
import { ProjectPage } from "../components/ProjectPage";
import {
    Project,
    ReactRouterLocation,
    ProjectBox,
    NodeList
} from "../types/data";

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    projectsJson: Project;
    allProjectsJson: NodeList<ProjectBox>;
}

export const ProjectTemplate: React.SFC<Props> = ({ data, location }) => (
    <Layout location={location} title={data.projectsJson.titleLineOne}>
        <ProjectPage
            project={data.projectsJson}
            allProjects={data.allProjectsJson.edges}
        />
    </Layout>
);

export const ProjectQuery = graphql`
    query project($id: String!) {
        projectsJson(id: { eq: $id }) {
            ...Project
        }
        allProjectsJson(
            filter: { featured: { eq: true }, id: { ne: $id } }
            sort: { order: DESC, fields: [goLiveDate] }
        ) {
            edges {
                node {
                    ...ProjectBox
                }
            }
        }
    }
`;

export default ProjectTemplate;
