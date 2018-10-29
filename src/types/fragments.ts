import { graphql } from "gatsby";

export const pageFieldsFragment = graphql`
    fragment PageFields on PagesJson {
        title
        heroImage {
            childImageSharp {
                fluid(srcSetBreakpoints: [1024, 720, 360]) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        subheading
        description
        seoTitle
        seoDescription
        seoKeywords
    }
`;

export const clientFragment = graphql`
    fragment Client on ClientsJson {
        name
        logo {
            childImageSharp {
                fluid(maxWidth: 600, srcSetBreakpoints: [420, 210]) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
        promoLogo {
            childImageSharp {
                fluid(maxWidth: 600, srcSetBreakpoints: [420, 210]) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
        featured
        featuredProject
    }
`;

export const projectBoxFragment = graphql`
    fragment ProjectBox on ProjectsJson {
        name
        slug
        titleLineOne
        client {
            ...Client
        }
        heroImage {
            childImageSharp {
                fluid(
                    maxWidth: 1066
                    maxHeight: 1066
                    srcSetBreakpoints: [1066, 720, 360, 250]
                ) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                }
            }
            publicURL
        }
    }
`;

export const projectFragment = graphql`
    fragment Project on ProjectsJson {
        name
        slug
        client {
            ...Client
        }
        titleLineOne
        titleLineTwo
        goLiveDate
        caseStudyTitle
        caseStudyText
        externalUrl
        heroImage {
            childImageSharp {
                fluid(srcSetBreakpoints: [1024, 720, 360]) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
            publicURL
        }
        heroVideo {
            publicURL
        }
        gallery {
            image {
                childImageSharp {
                    fluid(srcSetBreakpoints: [720, 360]) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
                publicURL
            }
            alt
        }
        challenge {
            description
            hurdles {
                title
                image {
                    childImageSharp {
                        fixed(width: 290) {
                            ...GatsbyImageSharpFixed_withWebp_tracedSVG
                        }
                    }
                    publicURL
                }
                text
            }
        }
        solution {
            hurdles {
                title
                image {
                    childImageSharp {
                        fixed(width: 290) {
                            ...GatsbyImageSharpFixed_withWebp_tracedSVG
                        }
                    }
                    publicURL
                }
                text
            }
            description
        }
        results {
            description
            hurdles {
                title
                image {
                    childImageSharp {
                        fixed(width: 290) {
                            ...GatsbyImageSharpFixed_withWebp_tracedSVG
                        }
                    }
                    publicURL
                }
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
            avatar {
                childImageSharp {
                    fixed(width: 75) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
                publicURL
            }
        }
        id
    }
`;
