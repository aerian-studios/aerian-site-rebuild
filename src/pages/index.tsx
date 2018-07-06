import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { Client, NodeList, Project, ReactRouterLocation } from "../types/data";

import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
import { extractNodes } from "../lib/helpers";
import * as styles from "./index.scss";
interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    allProjectsJson: NodeList<Project>;
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout location={props.location} title={"Aerian Studios"}>
            <section id="section-index">
                <PageHeader>
                    <h1>This is the home page</h1>
                </PageHeader>
                <ShowcaseCarousel
                    projects={extractNodes(props.data.allProjectsJson)}
                />
            </section>
        </Layout>
    );
};
export const pageQuery = graphql`
    query ProjectsQuery {
        allProjectsJson(filter: { featured: { eq: true } }) {
            edges {
                node {
                    ...ProjectBox
                }
            }
        }
    }
`;
export default IndexPage;
