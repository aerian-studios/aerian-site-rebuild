import { graphql } from "gatsby";
import * as React from "react";
import { AboutPage } from "../components/AboutPage";
import Layout from "../components/Layout";
import { extractNodes } from "../lib/helpers";
import { About, Client, NodeList, ReactRouterLocation } from "../types/data";

interface GraphData {
    pagesJson: About;
    allClientsJson: NodeList<Client>;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const AboutTemplate: React.SFC<Props> = ({ data, location }) => (
    <Layout location={location} {...data.pagesJson}>
        <AboutPage
            page={data.pagesJson}
            clients={extractNodes(data.allClientsJson)}
        />
    </Layout>
);

export const pageQuery = graphql`
    query AboutPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
            infographic {
                primaryText
                type
                secondaryText
                imageCount
                image {
                    publicURL
                }
            }
        }
        allClientsJson(skip: 0) {
            edges {
                node {
                    ...Client
                }
            }
        }
    }
`;
export default AboutTemplate;
