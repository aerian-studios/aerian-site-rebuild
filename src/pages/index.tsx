import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { ShowcaseCarousel } from "../components/ShowcaseCarousel";
import { extractNodes } from "../lib/helpers";

import { NodeList, ProjectBox, ReactRouterLocation } from "../types/data";
import * as styles from "./index.module.scss";
interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    allProjectsJson: NodeList<ProjectBox>;
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout
            location={props.location}
            title={"Aerian Studios"}
            seoDescription={`Industry leading campaigns, websites, products and mobile Apps. 
        Bespoke user driven design and software development with open source web technologies for over 20 years. `}
        >
            <section id="section-index">
                <ShowcaseCarousel
                    feature={true}
                    data={extractNodes(props.data.allProjectsJson)}
                />
            </section>
        </Layout>
    );
};
export const pageQuery = graphql`
    query ProjectsQuery {
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
export default IndexPage;
