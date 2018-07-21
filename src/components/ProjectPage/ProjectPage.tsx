import * as React from "react";

import { FullScreenMedia } from "../FullScreenMedia";
import Layout from "../Layout";
import { PageHeader } from "../PageHeader/PageHeader";

import { Project, ReactRouterLocation } from "../../types/data";
import { Block } from "../Block";
import { CaseStudyIntro } from "../CaseStudyIntro";
import { Gallery } from "../Gallery";
import { OnwardJournies } from "../OnwardJournies";
import { PerformanceBlock } from "../PerformanceBlock";
import { ProjectStageBlock } from "../ProjectStageBlock";
import { SectionNav } from "../SectionNav";
import { TestimonialBlock } from "../TestimonialBlock";

import * as sharedStyles from "../Layout.module.scss";

interface Props {
    project: Project;
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

export const ProjectPage: React.SFC<Props> = ({ project }) => (
    <>
        <PageHeader>
            <FullScreenMedia
                image={project.heroImage}
                aria-labelled-by="page-title"
                video={project.heroVideo}
            />

            <div>
                <h1>
                    {project.titleLineOne}
                    <br />
                    {project.titleLineTwo}
                </h1>
            </div>
        </PageHeader>
        <SectionNav
            keyConsts={keys}
            onNavigation={onNavigation}
            className={sharedStyles.sectionNav}
            navItemClassName={sharedStyles.sectionNavItem}
            navWrapperClassName={sharedStyles.sectionNavWrapper}
        />
        <Block>
            <div>Client logo</div>
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
        <Block>
            <OnwardJournies projectURL={project.externalUrl} />
        </Block>
    </>
);

export default ProjectPage;
