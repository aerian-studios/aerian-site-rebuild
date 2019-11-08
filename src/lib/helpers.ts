import deepMap from "deep-map";
import { FileField, FileNode, ImageSharp, NodeList } from "../types/data";
export const isImageSharp = (image: FileField): image is ImageSharp => {
    return (
        image.hasOwnProperty("childImageSharp") &&
        !!(image as ImageSharp).childImageSharp
    );
};

export const isFileNode = (file: FileField): file is FileNode => {
    return file.hasOwnProperty("publicURL");
};

export const getSrc = (file?: FileField) => {
    if (!file) {
        return "";
    }
    if (isImageSharp(file)) {
        if (file.childImageSharp.fixed) {
            return file.childImageSharp.fixed.src;
        }
        if (file.childImageSharp.fluid) {
            return file.childImageSharp.fluid.src;
        }
    }
    if (isFileNode(file)) {
        return file.publicURL;
    }
    if (typeof file === "string") {
        return file;
    }
    return "";
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

export const extractNodes = <T>(nodeList: NodeList<T>): T[] =>
    nodeList.edges.map(node => node.node);
