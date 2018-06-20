import * as React from "react";

export const isImageSharp = (
    image: ImageSharp | string
): image is ImageSharp => {
    return typeof image !== "string";
};

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
export interface PageSection {
    title: string;
    image?: ImageSharp | string;
    smallImage?: ImageSharp | string;
    subtitle: string;
    blurb: string;
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
