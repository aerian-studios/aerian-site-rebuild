import { graphql } from "gatsby";
import * as React from "react";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { Client, NodeList, ReactRouterLocation } from "../types/data";

import * as styles from "./index.scss";
interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    allClientsJson: NodeList<Client>;
}

const IndexPage: React.SFC<Props> = props => {
    return (
        <Layout location={props.location} title={"Aerian Studios"}>
            <section id="section-index">
                <PageHeader>
                    <h1>This is the home page</h1>
                </PageHeader>
                <marquee scrollamount="3">
                    <div className={styles.marquee}>
                        {props.data.allClientsJson.edges.map(({ node }) => (
                            <Image source={node.logo} />
                        ))}
                    </div>
                </marquee>
            </section>
        </Layout>
    );
};
export const pageQuery = graphql`
    query ClientsQuery {
        allClientsJson(limit: 1000, filter: { featured: { eq: true } }) {
            edges {
                node {
                    ...Client
                }
            }
        }
    }
`;
export default IndexPage;
