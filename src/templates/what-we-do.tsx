import { graphql } from "gatsby";
import * as React from "react";

import Layout from "../components/Layout";
import { WhatWeDoPage } from "../components/WhatWeDoPage";
import { ReactRouterLocation, WhatWeDo } from "../types/data";

interface GraphData {
    pagesJson: WhatWeDo;
}

interface Props {
    data: GraphData;
    location: ReactRouterLocation;
}
export const WhatWeDoTemplate: React.SFC<Props> = ({ data, location }) => {
    return (
        <Layout location={location} {...data.pagesJson}>
            <WhatWeDoPage page={data.pagesJson} />
        </Layout>
    );
};

export const pageQuery = graphql`
    query WhatWeDoPage($id: String!) {
        pagesJson(id: { eq: $id }) {
            ...PageFields
            sections {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                smallImage {
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                subtitle
                blurb
                activities {
                    title
                    text
                }
                successStory {
                    title
                    stats {
                        title
                        text
                        image {
                            childImageSharp {
                                fixed(width: 48) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
                testimonial {
                    person
                    title
                    quote
                    avatar {
                        childImageSharp {
                            fixed(width: 77) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default WhatWeDoTemplate;
