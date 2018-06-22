import { ImageSharp, ImageSharpSizes } from "../types/data";

export const isImageSharp = (
    image: ImageSharp | string
): image is ImageSharp => {
    return typeof image !== "string";
};

export const isImageSharpSizes = (
    image: ImageSharpSizes | string
): image is ImageSharpSizes => {
    return typeof image !== "string";
};
