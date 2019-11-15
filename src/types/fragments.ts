import { graphql } from "gatsby";

export const pageFieldsFragment = graphql`
    fragment PageFields on PagesJson {
        title
        heroImage {
            childImageSharp {
                fluid(
                    maxWidth: 1800
                    srcSetBreakpoints: [400, 550, 800, 1600, 1800]
                    quality: 75
                    toFormat: JPG
                ) {
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
                fluid(maxWidth: 345) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
        promoLogo {
            childImageSharp {
                fluid(maxWidth: 345) {
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
                    maxWidth: 1400
                    srcSetBreakpoints: [720, 1024, 1400]
                    quality: 75
                    toFormat: JPG
                ) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                }
            }
            publicURL
        }
        thumbnail: heroImage {
            childImageSharp {
                fluid(
                    maxWidth: 720
                    maxHeight: 720
                    srcSetBreakpoints: [400, 720]
                    quality: 75
                    toFormat: JPG
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
                fluid(
                    maxWidth: 2000
                    srcSetBreakpoints: [400, 720, 1024, 2000]
                    quality: 75
                    toFormat: JPG
                ) {
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
                    fluid(
                        maxWidth: 1024
                        srcSetBreakpoints: [1024, 720, 360]
                        quality: 75
                        toFormat: JPG
                    ) {
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
                        fixed(width: 282) {
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
                        fixed(width: 282) {
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
                        fixed(width: 282) {
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
