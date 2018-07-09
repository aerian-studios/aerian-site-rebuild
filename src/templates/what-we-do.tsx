import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import Layout from "../components/Layout";
import { PageSectionBlock } from "../components/PageSectionBlock";
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
                <div>
                    {sections &&
                        sections.map((section, i) => (
                            <PageSectionBlock
                                section={section}
                                alternate={i % 2 === 0}
                            />
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
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                smallImage {
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                subtitle
                blurb
                activities {
                    title
                    text
                }
                successStory {
                    title
                    stats {
                        title
                        text
                        image {
                            childImageSharp {
                                fixed(width: 48) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
                testimonial {
                    person
                    title
                    quote
                    avatar {
                        childImageSharp {
                            fixed(width: 77) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default WhatWeDoPage;
