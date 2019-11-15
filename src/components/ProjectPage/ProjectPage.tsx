import * as React from "react";

import { Edge, Project, ProjectBox } from "../../types/data";
import { Block } from "../Block";
import { CaseStudyIntro } from "../CaseStudyIntro";
import { Gallery } from "../Gallery";
import { HeroBlock } from "../HeroBlock";
import { Image } from "../Image";
import { OnwardJourneys } from "../OnwardJourneys";
import { PageHeader } from "../PageHeader";
import { PerformanceBlock } from "../PerformanceBlock";
import { ProjectStageBlock } from "../ProjectStageBlock";
import { SectionNav } from "../SectionNav";
import { TestimonialBlock } from "../TestimonialBlock";

import * as sharedStyles from "../Layout.module.scss";
import { SquareCarousel } from "../SquareCarousel";
import * as styles from "./ProjectPage.module.scss";

interface Props {
    project: Project;
    allProjects: Array<Edge<ProjectBox>>;
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

export const ProjectPage: React.SFC<Props> = ({ project, allProjects }) => (
    <>
        <PageHeader className={sharedStyles.withSectionNav}>
            <HeroBlock
                heroImage={project.heroImage}
                aria-labelledby="page-title"
                heroVideo={project.heroVideo}
            >
                <h1>
                    {project.titleLineOne}
                    {project.titleLineTwo ? (
                        <>
                            <br />
                            {project.titleLineTwo}
                        </>
                    ) : null}
                </h1>
            </HeroBlock>
        </PageHeader>
        <SectionNav
            keyConsts={keys}
            onNavigation={onNavigation}
            className={sharedStyles.sectionNav}
            navItemClassName={sharedStyles.sectionNavItem}
            navWrapperClassName={sharedStyles.sectionNavWrapper}
        />
        <section className={sharedStyles.contentWrapper}>
            <Block className={styles.projectIntro}>
                <figure>
                    <Image source={project.client.logo} />
                </figure>
                <CaseStudyIntro project={project} />
            </Block>
            <Block>
                <Gallery gallery={project.gallery} />
            </Block>
            <Block>
                <ProjectStageBlock
                    title="The Challenge"
                    projectStage={project.challenge}
                />
            </Block>
            <Block>
                <ProjectStageBlock
                    title="The Solution"
                    projectStage={project.solution}
                />
            </Block>
            <Block>
                <ProjectStageBlock
                    title="The Result"
                    projectStage={project.results}
                />
            </Block>
            {project.testimonial && (
                <Block>
                    <TestimonialBlock testimonial={project.testimonial} />
                </Block>
            )}
            {project.performance && (
                <Block>
                    <PerformanceBlock performance={project.performance} />
                </Block>
            )}
            <OnwardJourneys projectURL={project.externalUrl} />
            <SquareCarousel data={allProjects} />
        </section>
    </>
);

export default ProjectPage;
