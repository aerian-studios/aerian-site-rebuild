import { graphql } from "gatsby";

export const pageFieldsFragment = graphql`
    fragment PageFields on PagesJson {
        title
        heroImage {
            childImageSharp {
                fluid(maxWidth: 2048) {
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
                fluid(maxWidth: 420) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
            publicURL
        }
        promoLogo {
            childImageSharp {
                fluid(maxWidth: 420) {
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
        client {
            ...Client
        }
        heroImage {
            childImageSharp {
                fluid(maxWidth: 1066, maxHeight: 1066) {
                    ...GatsbyImageSharpFluid_withWebp
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
                fluid(maxWidth: 2048) {
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
                    fluid(maxWidth: 1024) {
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
                    fluid(maxWidth: 231) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                }
                publicURL
            }
        }
        id
    }
`;
