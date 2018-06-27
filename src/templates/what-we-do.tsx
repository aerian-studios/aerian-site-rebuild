import { graphql } from "gatsby";
import * as React from "react";
import { FullScreenMedia } from "../components/FullScreenMedia";
import { PageHeader } from "../components/PageHeader/PageHeader";

import { isImageSharp } from "../lib/helpers";
import { ImageSharp, ImageSharpSizes, PageSection } from "../types/data";

interface GraphData {
    pagesJson: {
        heroImage?: ImageSharp | string;
        title?: string;
        sections?: PageSection[];
    };
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
                    sections.map(section => {
                        // Make componenets for here
                    })}
            </div>
        </section>
    );
};

const pageQuery = graphql`
    query WhatWeDoPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            # heroImage
            # pageTitle
            title
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

// Make type interface
// const WhatWeDoPage: React.SFC = ({ children }) => {
//     return (
//         <StaticQuery
//             query={graphql`
//                 query WhatWeDoPage {
//                     pagesJson(path: { eq: "/what-we-do" }) {
//                         # heroImage
//                         # pageTitle
//                         title
//                         sections {
//                             title
//                             image
//                             smallImage
//                             subtitle
//                             blurb
//                         }
//                     }
//                 }
//             `}
//             render={({ pagesJson: data }: { pagesJson: GraphData }) => {
//                 console.log(data);
//                 return (
//                     <WhatWeDoPageTemplate
//                         title={data.title || ""}
//                         sections={data.sections || []}
//                         heroImage={
//                             !data.heroImage ||
//                             typeof data.heroImage === "string"
//                                 ? data.heroImage || ""
//                                 : data.heroImage.childImageSharp.sizes
//                         }
//                     />
//                 );
//             }}
//         />
//     );
// };
export default WhatWeDoPage;
