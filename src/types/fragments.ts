import { graphql } from "gatsby";

export const pageFieldsFragment = graphql`
    fragment PageFields on PagesJson {
        title
        heroImage {
            childImageSharp {
                fluid(srcSetBreakpoints: [1024, 720, 360], toFormat: JPG) {
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
                fluid(
                    maxWidth: 390
                    srcSetBreakpoints: [1200, 1024, 768, 480, 340]
                ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
        promoLogo {
            childImageSharp {
                fluid(
                    maxWidth: 390
                    srcSetBreakpoints: [1200, 1024, 768, 480, 340]
                ) {
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
                    maxWidth: 786
                    maxHeight: 786
                    quality: 65
                    srcSetBreakpoints: [960, 640, 480, 390, 240]
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
                    maxWidth: 390
                    maxHeight: 390
                    quality: 65
                    srcSetBreakpoints: [640, 480, 240]
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
                fluid(srcSetBreakpoints: [1024, 720, 360], toFormat: JPG) {
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
                    fluid(srcSetBreakpoints: [720, 360], toFormat: JPG) {
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
