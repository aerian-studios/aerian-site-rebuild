import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
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

export const OurWorkPage: React.SFC<Props> = props => {
    const {
        title,
        heroImage,
        seoDescription,
        seoKeywords,
        seoTitle
    } = props.data.pagesJson;
    return (
        <Layout
            location={props.location}
            {...{
                title,
                seoDescription,
                seoKeywords,
                seoTitle
            }}
        >
            <section>
                <ShowcaseCarousel
                    projects={extractNodes(props.data.allClientsJson)}
                />
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query OurWorkPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
        allProjectsJson(skip: 0) {
            edges {
                node {
                    ...ProjectBox
                }
            }
        }
    }
`;
export default OurWorkPage;
