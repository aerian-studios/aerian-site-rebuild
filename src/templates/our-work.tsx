import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { OurWorkPage } from "../components/OurWorkPage";
import { extractNodes, isImageSharp } from "../lib/helpers";
import {
    About,
    Client,
    NodeList,
    Project,
    ReactRouterLocation
} from "../types/data";

interface GraphData {
    pagesJson: About;
    allProjectsJson: NodeList<Project>;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const OurWorkTemplate: React.SFC<Props> = ({ data, location }) => {
    return (
        <Layout location={location} {...data.pagesJson}>
            <OurWorkPage
                page={data.pagesJson}
                projects={extractNodes(data.allProjectsJson)}
            />
        </Layout>
    );
};

export const pageQuery = graphql`
    query OurWorkPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
        allProjectsJson(
            filter: { featured: { eq: true } }
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
export default OurWorkTemplate;
