import * as React from "react";

import Content, { HTMLContent } from "../components/GenericContent";
import { HeroBlock } from "../components/HeroBlock";
import { FullScreenMedia } from "../components/FullScreenMedia";

import { ImageSharpSizes, PageSection, Staff, ImageSharp } from "../types/data";

interface Props {
    title: string;
    sections: PageSection[];
    staff: Staff[];
    heroImage: ImageSharpSizes | string;
}
export const MeeTheTeamPageTemplate: React.SFC<Props> = ({
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
const MeeTheTeamPage: React.SFC<graphData> = ({ data }) => {
    return (
        <MeeTheTeamPageTemplate
            title={data.pageTitle || ""}
            heroImage={
                !data.heroImage || typeof data.heroImage === "string"
                    ? data.heroImage || ""
                    : data.heroImage.childImageSharp.sizes
            }
            staff={data.staff}
            sections={data.sections}
        />
    );
};
export default MeeTheTeamPage;

interface graphData {
    data: {
        heroImage?: string | ImageSharp;
        pageTitle?: string;
        sections?: PageSection[];
        staff: Staff[];
    };
}
export const meeTheTeamPageQuery: graphData = graphql`
    query MeeTheTeamPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            # heroImage
            # pageTitle
            sections {
                title
                image
                smallImage
                subtitle
                blurb
            }
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
`;