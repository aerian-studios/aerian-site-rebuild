import { graphql } from "gatsby";
import * as React from "react";

import { FullScreenMedia } from "../components/FullScreenMedia";
import Layout from "../components/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { Block } from "../components/Block";
import { CaseStudyIntro } from "../components/CaseStudyIntro";
import { Gallery } from "../components/Gallery";
import { OnwardJournies } from "../components/OnwardJournies";
import { PerformanceBlock } from "../components/PerformanceBlock";
import { ProjectStageBlock } from "../components/ProjectStageBlock";
import { SectionNav } from "../components/SectionNav";
import { Project, ReactRouterLocation } from "../types/data";

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}

interface GraphData {
    projectsJson: Project;
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
    const project = props.data.projectsJson;
    return (
        <Layout location={props.location} title={project.titleLineOne}>
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
            <SectionNav keyConsts={keys} onNavigation={onNavigation} />
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
                    {/*  TestimonialBlock  */}
                    <blockquote>{project.testimonial.quote}</blockquote>
                    <cite>{project.testimonial.person}</cite>
                    <cite>{project.testimonial.title}</cite>
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
        </Layout>
    );
};

export const ProjectQuery = graphql`
    query project($id: String!) {
        projectsJson(id: { eq: $id }) {
            ...Project
        }
    }
`;

export default ProjectPage;
