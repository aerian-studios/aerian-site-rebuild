import * as React from "react";

export interface Image {
    alt?: string;
    image: string | ImageSharp;
}

export interface ImageSharp {
    childImageSharp: {
        sizes: ImageSharpSizes;
        src: string;
    };
}

export interface ImageSharpSizes {
    aspectRatio?: number;
    sizes?: string;
    src: string;
    srcSet?: string;
    tracedSVG?: string;
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
    image?: ImageSharp | string;
    smallImage?: ImageSharp | string;
    subtitle: string;
    blurb: string;
}

export interface StaffPage {
    title: string;
    path: string;
    staff: Staff[];
}

export interface Staff {
    name: string;
    jobTitle: string;
    live: boolean;
    imageNormal: string;
    imageFunny: string;
    description: string;
    fact: string;
    skills: string[];
}
