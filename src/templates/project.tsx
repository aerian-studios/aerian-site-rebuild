import * as React from "react";

import Content, { HTMLContent } from "../components/GenericContent";
import { HeroBlock } from "../components/HeroBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";

import { ImageSharpSizes } from "../types/data";

interface Props {
    title: string;
    content: React.ReactChildren;
    contentComponent?: React.SFC;
    heroImage: ImageSharpSizes | string;
}
export const ProjectPageTemplate: React.SFC<Props> = ({
    title,
    content,
    contentComponent,
    heroImage
}) => {
    return (
        <section className="section section--about">
            <HeroBlock>
                {/* {typeof heroImage === "string" ? (
                    // Cover the situation where there is no imageSharp (e.g. in the cms)
                    <img
                        className="full-screen"
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                    />
                ) : (
                    <FullScreenMedia
                        image={heroImage}
                        altText={title}
                        video=""
                    />
                )} */}
                <div className="block--hero__content-wrap">
                    <h1 className="block--hero__title">{title}</h1>
                </div>
            </HeroBlock>
            <div className="block--full block layout-grid">
                
            </div>
        </section>
    );
};

const createCorrectMediumComponent = (video, image) => {
    return (video || typeof image === "string")
    ? image
    : image.childImageSharp.sizes
}

// Make type interface
const ProjectPage: React.SFC = ({ data }) => {
    console.log(data);
    const project = data.projectsJson;

    return (
        <ProjectPageTemplate
            title={project.titleLineOne}
            heroImage={
                createCorrectMediumComponent(project.heroVideo, project.heroImage);
            }
            heroVideo={
                project.heroVideo
            }
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
            homepage
            featured
            rolloverDetails
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
