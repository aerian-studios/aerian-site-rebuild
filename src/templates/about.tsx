import { graphql } from "gatsby";
import * as React from "react";
import { ClientGridBlock } from "../components/ClientGridBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { Image } from "../components/Image";
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
        seoTitle,
        infographic
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
            {/* {JSON.stringify(infographic)} */}
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
                <div style={{ display: "flex" }}>
                    {infographic &&
                        infographic.map(
                            i =>
                                i.image && (
                                    <Image
                                        style={{ width: 100, height: 100 }}
                                        source={i.image}
                                    />
                                )
                        )}
                </div>
            </section>
        </Layout>
    );
};

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
export default AboutPage;
