import { graphql } from "gatsby";
import * as React from "react";

import { FullScreenMedia } from "../components/FullScreenMedia";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { SectionNav } from "../components/SectionNav/";
import { isImageSharp } from "../lib/helpers";
import {
    ImageSharp,
    ImageSharpSizes,
    ReactRouterLocation
} from "../types/data";

interface Block {
    description: string;
    hurdles: {
        title: string;
        image: string | ImageSharpSizes;
        text: string;
    };
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    projectsJson: {
        pageTitle1: string;
        pageTitle2: string;
        heroImage: ImageSharpSizes | string;
        heroVideo?: string;
        caseStudy: {
            title: string;
            text: string;
        };
        challenge?: Block;
        solution?: Block;
        results?: Block;
        performance?: {
            title: string;
            text: string;
        };
        testimonial?: {
            quote: string;
            person: string;
            title: string;
            avatar: string | ImageSharpSizes;
        };
        id: string;
    };
}

const keys = {
    caseStudy: "Introduction",
    gallery: "Gallery",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "The Result"
};

const onNavigation = (id: string) => {
    alert(id);
};

export const ProjectPage: React.SFC<Props> = props => {
    const {
        pageTitle1,
        pageTitle2,
        heroImage,
        heroVideo,
        caseStudy,
        challenge,
        solution,
        results,
        performance,
        testimonial,
        id
    } = props.data.projectsJson;
    return (
        <Layout location={props.location} title={pageTitle1}>
            <section className="section section--about">
                <PageHeader>
                    {typeof heroImage === "string" ? (
                        // Cover the situation where there is no imageSharp (e.g. in the cms)
                        !heroVideo ? (
                            <img
                                className="full-screen"
                                src={heroImage}
                                alt=""
                                aria-hidden="true"
                            />
                        ) : (
                            <FullScreenMedia
                                image={heroImage}
                                video={heroVideo}
                            />
                        )
                    ) : (
                        <FullScreenMedia
                            image={heroImage}
                            aria-labelled-by="page-title"
                            video=""
                        />
                    )}
                    <div className="block--hero__content-wrap">
                        <h1 id="page-title" className="block--hero__title">
                            {pageTitle1}
                            <br />
                            {pageTitle2}
                        </h1>
                    </div>
                </PageHeader>
                {/* <SectionNav
                keyConsts={keys}
                sections={props}
                onNavigation={onNavigation}
            /> */}
                <div className="block--full block layout-grid" />
            </section>
        </Layout>
    );
};

const createCorrectMediumComponent = (image: ImageSharp | string) => {
    return isImageSharp(image) ? image.childImageSharp.fluid : image;
};

export const ProjectQuery = graphql`
    query project($id: String!) {
        projectsJson(id: { eq: $id }) {
            name
            titleLineOne
            titleLineTwo
            goLiveDate
            caseStudyTitle
            caseStudyText
            externalUrl
            heroImage {
                childImageSharp {
                    fluid(maxWidth: 2048) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            heroVideo
            challenge {
                description
                hurdles {
                    title
                    image {
                        childImageSharp {
                            fixed(width: 290) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    text
                }
            }
            solution {
                hurdles {
                    title
                    image {
                        childImageSharp {
                            fixed(width: 290) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    text
                }
                description
            }
            results {
                description
                hurdles {
                    title
                    image {
                        childImageSharp {
                            fixed(width: 290) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    text
                }
            }
            performance {
                title
                text
            }
            testimonial {
                quote
                person
                title
                avatar {
                    childImageSharp {
                        fixed(width: 290) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
            id
        }
    }
`;

export default ProjectPage;
