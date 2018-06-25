import * as React from "react";

import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { ImageSharp, ImageSharpSizes, PageSection } from "../types/data";

interface Props {
    title: string;
    sections: PageSection[];
    heroImage: ImageSharpSizes | string;
}
export const WhatWeDoPageTemplate: React.SFC<Props> = ({
    title,
    sections,
    heroImage
}) => {
    return (
        <section className="section section--about">
            <PageHeader>
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
            </PageHeader>
            <div className="block--full block layout-grid">
                {sections.map(section => {
                    // Make componenets for here
                })}
            </div>
        </section>
    );
};

// Make type interface
const WhatWeDoPage: React.SFC<graphData> = ({ data }) => {
    return (
        <WhatWeDoPageTemplate
            title={data.pageTitle || ""}
            sections={data.sections || []}
            heroImage={
                !data.heroImage || typeof data.heroImage === "string"
                    ? data.heroImage || ""
                    : data.heroImage.childImageSharp.sizes
            }
        />
    );
};
export default WhatWeDoPage;

interface graphData {
    data: {
        heroImage?: ImageSharp | string;
        pageTitle?: string;
        sections?: PageSection[];
    };
}

export const whatWeDoPageQuery: graphData = graphql`
    query WhatWeDoPage($id: String!) {
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
        }
    }
`;
