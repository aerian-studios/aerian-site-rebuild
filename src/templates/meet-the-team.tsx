import { graphql, StaticQuery } from "gatsby";
import * as React from "react";

import { FullScreenMedia } from "../components/FullScreenMedia";
import { HeroBlock } from "../components/HeroBlock/HeroBlock";

import { ImageSharp, ImageSharpSizes, PageSection, Staff } from "../types/data";

interface Props {
    title: string;
    sections: PageSection[];
    staff: Staff[];
    heroImage: ImageSharpSizes | string;
}

interface GraphData {
    heroImage?: string | ImageSharp;
    pageTitle?: string;
    sections?: PageSection[];
    staff: Staff[];
}

export const MeetTheTeamPageTemplate: React.SFC<Props> = ({
    title,
    sections,
    staff,
    heroImage
}) => {
    return (
        <section className="section section--about">
            <HeroBlock>
                {typeof heroImage === "string" ? (
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
                )}
                <div className="block--hero__content-wrap">
                    <h1 className="block--hero__title">{title}</h1>
                </div>
            </HeroBlock>
            <div className="block--full block layout-grid">
                {
                    // add staff
                }
            </div>
        </section>
    );
};

// Make type interface
const MeetTheTeamPage: React.SFC<GraphData> = props => (
    <StaticQuery
        query={graphql`
            query MeetTheTeamPage($id: String!) {
                pagesJson(id: { eq: $id }) {
                    staff {
                        name
                        jobTitle
                        live
                        imageNormal
                        imageFunny
                        description
                        fact
                        skills
                    }
                }
            }
        `}
        render={(data: GraphData) => {
            return (
                <MeetTheTeamPageTemplate
                    title={data.pageTitle || ""}
                    heroImage={
                        !data.heroImage || typeof data.heroImage === "string"
                            ? data.heroImage || ""
                            : data.heroImage.childImageSharp.sizes
                    }
                    staff={data.staff}
                    sections={data.sections || []}
                />
            );
        }}
    />
);

export default MeetTheTeamPage;
