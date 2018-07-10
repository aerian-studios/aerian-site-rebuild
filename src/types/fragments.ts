import { graphql } from "gatsby";

export const pageFieldsFragment = graphql`
    fragment PageFields on PagesJson {
        title
        heroImage {
            childImageSharp {
                fluid(maxWidth: 2048) {
                    ...GatsbyImageSharpFluid
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
                    ...GatsbyImageSharpFluid
                }
            }
        }
        promoLogo {
            childImageSharp {
                fluid(maxWidth: 420) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        featured
        featuredProject
    }
`;

export const projectBoxFragment = graphql`
    fragment ProjectBox on ProjectsJson {
        name
        slug
        heroImage {
            childImageSharp {
                fluid(maxWidth: 1066, maxHeight: 1066) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export const projectFragment = graphql`
    fragment Project on ProjectsJson {
        name
        slug
        titleLineOne
        titleLineTwo
        goLiveDate
        caseStudyTitle
        caseStudyText
        externalUrl
        heroImage {
            childImageSharp {
                fluid(maxWidth: 2048) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        heroVideo
        gallery {
            image {
                childImageSharp {
                    fluid(maxWidth: 1024) {
                        ...GatsbyImageSharpFluid
                    }
                }
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
                            ...GatsbyImageSharpFixed
                        }
                    }
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
                            ...GatsbyImageSharpFixed
                        }
                    }
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
                            ...GatsbyImageSharpFixed
                        }
                    }
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
                    fixed(width: 290) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
        id
    }
`;
