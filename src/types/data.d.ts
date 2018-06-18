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
