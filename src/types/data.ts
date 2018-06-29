import { graphql } from "gatsby";

export type ImageField = string | ImageSharp;

// Images

export interface Image {
    alt?: string;
    image: ImageField;
}

export interface ImageSharp {
    childImageSharp: {
        fluid?: ImageSharpSizes;
        fixed?: ImageSharpSizes;
    };
}
export interface ImageSharpSizes {
    aspectRatio?: number;
    sizes?: string;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
    base64?: string;
}

// PAGES
export interface PagesListData {
    data: {
        allPagesJson: PageList;
    };
}

export interface PageList {
    edges: PageListNode[];
}

export interface PageListNode {
    node: {
        id: string;
        path: string;
        title: string;
    };
}

export interface PageSection {
    title: string;
    image?: ImageField;
    smallImage?: ImageField;
    subtitle: string;
    blurb: string;
    activities?: Activity[];
    successStory?: SuccessStory;
    testimonial?: Testimonial;
}

export interface Page {
    title: string;
    path: string;
    heroImage?: ImageField;
    subheading: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
}

export interface WhatWeDo extends Page {
    sections?: PageSection[];
}

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

export interface MeetTheTeam extends Page {
    staff: Staff[];
}

export interface About extends Page {}

export interface Staff {
    name: string;
    jobTitle: string;
    live: boolean;
    imageNormal: ImageField;
    imageFunny: ImageField;
    description: string;
    fact: string;
    skills: string[];
}

export interface ReactRouterLocation {
    action: string;
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: null | string;
}

export interface Testimonial {
    quote?: string;
    person?: string;
    title?: string;
    avatar?: ImageField;
}

export interface Stat {
    title: string;
    text: string;
    image: ImageField;
}
export interface SuccessStory {
    title: string;
    stats?: Stat[];
}

export interface Activity {
    title: string;
    text: string;
}
