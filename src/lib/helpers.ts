import { ImageSharp } from "../types/data";

export const isImageSharp = (
    image: ImageSharp | string
): image is ImageSharp => {
    return typeof image !== "string";
};
