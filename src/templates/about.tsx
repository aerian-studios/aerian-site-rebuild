import { graphql } from "gatsby";
import * as React from "react";
import { ClientGridBlock } from "../components/ClientGridBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader";
import { extractNodes, isImageSharp } from "../lib/helpers";
import { About, Client, NodeList, ReactRouterLocation } from "../types/data";

interface GraphData {
    pagesJson: About;
    allClientsJson: NodeList<Client>;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const AboutPage: React.SFC<Props> = props => {
    const {
        title,
        heroImage,
        seoDescription,
        seoKeywords,
        seoTitle
    } = props.data.pagesJson;
    console.log(props);
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
                <PageHeader>
                    <FullScreenMedia
                        image={heroImage}
                        aria-labelled-by="page-title"
                    />
                    <div className="block--hero__content-wrap">
                        <h1 className="block--hero__title">{title}</h1>
                    </div>
                </PageHeader>
                <ClientGridBlock
                    clients={extractNodes(props.data.allClientsJson)}
                />
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query AboutPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
        allClientsJson(skip: 0) {
            edges {
                node {
                    name
                    logo {
                        childImageSharp {
                            fixed(width: 400) {
                                base64
                                width
                                height
                                src
                                srcSet
                                srcWebp
                                srcSetWebp
                            }
                        }
                    }
                    featuredProject
                }
            }
        }
    }
`;
export default AboutPage;
