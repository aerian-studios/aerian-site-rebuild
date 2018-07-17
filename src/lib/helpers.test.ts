/// <reference types="@types/jest" />

import { ImageSharp } from "../types/data";
import { image, imageSharp } from "../types/fixtures";
import {
    absolutifyURL,
    extractNodes,
    getSrc,
    isImageSharp,
    isImageSharpSizes
} from "./helpers";

describe("Helpers", () => {
    it("correctly detects an imageSharp", () => {
        expect(isImageSharp(imageSharp)).toBeTruthy();
        expect(isImageSharp(image)).toBeFalsy();
    });
    it("correctly detects imageSharpSizes", () => {
        expect(
            isImageSharpSizes(imageSharp.childImageSharp.fluid)
        ).toBeTruthy();
    });
    it("returns src for images", () => {
        const fixed: ImageSharp = {
            childImageSharp: {
                ...imageSharp.childImageSharp,
                fixed: imageSharp.childImageSharp.fluid,
                fluid: null
            }
        };
        expect(getSrc(null)).toBe("");
        expect(getSrc(image)).toBe(image);
        expect(getSrc(imageSharp)).toBe(imageSharp.childImageSharp.fluid.src);
        expect(getSrc(fixed)).toBe(imageSharp.childImageSharp.fluid.src);
    });
    it("absolutifies a path", () => {
        expect(absolutifyURL("/assets/foo.txt")).toBe(
            "https://raw.githubusercontent.com/aerian-studios/aerian-site-rebuild/master/static/assets/foo.txt"
        );
    });
    it("doesn't absolutify a non-path", () => {
        expect(absolutifyURL("/foo.txt")).toBe("/foo.txt");
        expect(absolutifyURL(1)).toBe(1);
    });
    it("extracts nodes from a nodelist", () => {
        const nl = {
            edges: [
                { node: 1 },
                { node: 3 },
                { node: 5 },
                { node: 7 },
                { node: 9 }
            ]
        };
        expect(extractNodes(nl)).toEqual([1, 3, 5, 7, 9]);
    });
});
