import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import Layout from "../components/Layout";
import { isImageSharp } from "../lib/helpers";
import { ReactRouterLocation, WhatWeDo } from "../types/data";

interface GraphData {
    pagesJson: WhatWeDo;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}
export const WhatWeDoPage: React.SFC<Props> = props => {
    const {
        title,
        sections,
        heroImage,
        seoDescription,
        seoKeywords,
        seoTitle
    } = props.data.pagesJson;
    return (
        <Layout
            title={title}
            location={props.location}
            {...{
                seoDescription,
                seoKeywords,
                seoTitle
            }}
        >
            <section className="section section--about">
                <PageHeader>
                    <FullScreenMedia
                        image={heroImage}
                        aria-labelled-by="page-title"
                    />
                    <div className="block--hero__content-wrap">
                        <h1 className="block--hero__title">{title}</h1>
                    </div>
                </PageHeader>
                <div className="block--full block layout-grid">
                    {sections &&
                        sections.map(section => (
                            <section key={section.title}>
                                <h4>{section.title}</h4>
                                <h5>{section.subtitle}</h5>
                                <p>{section.blurb}</p>
                            </section>
                        ))}
                </div>
            </section>
        </Layout>
    );
};

export const pageQuery = graphql`
    query WhatWeDoPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
            sections {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 100) {
                            base64
                            src
                            srcSet
                        }
                    }
                }
                smallImage {
                    childImageSharp {
                        fluid(maxWidth: 100) {
                            base64
                            src
                            srcSet
                        }
                    }
                }
                subtitle
                blurb
            }
        }
    }
`;

export default WhatWeDoPage;
