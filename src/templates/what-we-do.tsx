import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { isImageSharp } from "../lib/helpers";
import { WhatWeDo } from "../types/data";

interface GraphData {
    pagesJson: WhatWeDo;
}

interface Props {
    data: GraphData;
}
export const WhatWeDoPage: React.SFC<Props> = props => {
    const { title, sections, heroImage } = props.data.pagesJson;
    return (
        <section className="section section--about">
            <PageHeader>
                {heroImage && isImageSharp(heroImage) ? (
                    <FullScreenMedia
                        image={heroImage.childImageSharp.sizes}
                        altText={title}
                        video=""
                    />
                ) : (
                    // Cover the situation where there is no imageSharp (e.g. in the cms)
                    <img
                        className="full-screen"
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                    />
                )}
                <div className="block--hero__content-wrap">
                    <h1 className="block--hero__title">{title}</h1>
                </div>
            </PageHeader>
            <div className="block--full block layout-grid">
                {sections &&
                    sections.map(section => (
                        <section>
                            <h4>{section.title}</h4>
                            <h5>{section.subtitle}</h5>
                            <p>{section.blurb}</p>
                        </section>
                    ))}
            </div>
        </section>
    );
};

export const pageQuery = graphql`
    query WhatWeDoPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
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

export default WhatWeDoPage;
