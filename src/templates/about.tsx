import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader";
import { isImageSharp } from "../lib/helpers";
import { About, ReactRouterLocation } from "../types/data";

interface GraphData {
    pagesJson: About;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

export const about: React.SFC<Props> = props => {
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
            <section className="section section--about">
                <PageHeader>
                    {heroImage && isImageSharp(heroImage) ? (
                        <FullScreenMedia
                            image={heroImage.childImageSharp.fluid}
                            altText={title}
                            video=""
                        />
                    ) : (
                        // Cover the situation where there is no imageSharp (e.g. in the cms)
                        <img
                            className="full-screen"
                            src={heroImage}
                            alt=""
                            aria-hidden="true"
                        />
                    )}
                    <div className="block--hero__content-wrap">
                        <h1 className="block--hero__title">{title}</h1>
                    </div>
                </PageHeader>
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query AboutPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
        }
    }
`;
export default about;
