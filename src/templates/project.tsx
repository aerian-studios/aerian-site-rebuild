import * as React from "react";

import Content, { HTMLContent } from "../components/GenericContent";
import { HeroBlock } from "../components/HeroBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";

import { ImageSharpSizes } from "../types/data";
import { SectionNav } from "../components/SectionNav/";

interface block {
    description: string;
    hurdles: {
        title: string;
        image: string | ImageSharpSizes;
        text: string;
    };
}

interface Props {
    pageTitle1: string;
    pageTitle2: string;
    heroImage: ImageSharpSizes | string;
    heroVideo?: string;
    caseStudy: {
        title: string;
        text: string;
    };
    challenge?: block;
    solution?: block;
    results?: block;
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
}

const keys = {
    caseStudy: "Introduction",
    gallery: "Gallery",
    challenge: "The Challenge",
    solution: "The Solution",
    results: "The Result"
};

const onNavigation = id => {
    alert(id);
};

export const ProjectPageTemplate: React.SFC<Props> = props => {
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
    } = props;

    return (
        <section className="section section--about">
            <HeroBlock>
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
                        <FullScreenMedia image={heroImage} video={heroVideo} />
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
            </HeroBlock>
            <SectionNav
                keyConsts={keys}
                sections={props}
                onNavigation={onNavigation}
            />
            <div className="block--full block layout-grid" />
        </section>
    );
};

const createCorrectMediumComponent = image => {
    return typeof image === "string" ? image : image.childImageSharp.sizes;
};

// Make type interface
const ProjectPage: React.SFC = ({ data }) => {
    const project = data.projectsJson;

    return (
        <ProjectPageTemplate
            pageTitle1={project.titleLineOne}
            pageTitle2={project.titleLineTwo}
            heroImage={createCorrectMediumComponent(project.heroImage)}
            heroVideo={project.heroVideo}
            caseStudy={{
                title: project.caseStudyTitle,
                text: project.caseStudyText
            }}
            challenge={project.challenge}
            solution={project.solution}
            results={project.results}
            performance={project.performance}
            testimonial={project.testimonial}
            id={project.id}
        />
    );
};
export default ProjectPage;

export const projectPageQuery = graphql`
    query project($id: String!) {
        projectsJson(id: { eq: $id }) {
            name
            titleLineOne
            titleLineTwo
            goLiveDate
            caseStudyTitle
            caseStudyText
            externalUrl
            heroImage
            heroVideo
            challenge {
                description
                hurdles {
                    title
                    image
                    text
                }
            }
            solution {
                hurdles {
                    title
                    image
                    text
                }
                description
            }
            results {
                description
                hurdles {
                    title
                    image
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
                avatar
            }
            id
        }
    }
`;
