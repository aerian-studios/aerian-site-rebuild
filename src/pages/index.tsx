import { graphql } from "gatsby";
import * as React from "react";
import { Image } from "../components/Image";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { Client, NodeList, ReactRouterLocation } from "../types/data";

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
                {props.data.allClientsJson.edges.map(({ node }) => (
                    <Image source={node.logo} />
                ))}
            </section>
        </Layout>
    );
};
export const pageQuery = graphql`
    query ClientsQuery {
        allClientsJson(limit: 1000, filter: { featured: { eq: true } }) {
            edges {
                node {
                    name
                    logo {
                        childImageSharp {
                            fixed(width: 420) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    promoLogo {
                        childImageSharp {
                            fixed(width: 420) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    featured
                    featuredProject
                }
            }
        }
    }
`;
export default IndexPage;
