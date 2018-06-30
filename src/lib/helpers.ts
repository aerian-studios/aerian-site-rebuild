import deepMap from "deep-map";
import { ImageSharp, ImageSharpSizes } from "../types/data";
export const isImageSharp = (
    image: ImageSharp | string
): image is ImageSharp => {
    return image.hasOwnProperty("childImageSharp");
};

export const isImageSharpSizes = (
    image: ImageSharpSizes | string
): image is ImageSharpSizes => {
    return typeof image !== "string";
};

export const absolutifyURL = (url: string) => {
    if (typeof url !== "string" || url.substr(0, 8) !== "/assets/") {
        return url;
    }
    return `https://raw.githubusercontent.com/aerian-studios/aerian-site-rebuild/master/static${url}`;
};
export const absolutifyURLs = <T = any>(obj: T) => {
    return deepMap<T>(obj, absolutifyURL);
};
