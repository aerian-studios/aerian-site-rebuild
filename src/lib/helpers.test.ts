/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageSharp } from "../types/data";
import { image, imageSharp } from "../types/fixtures";
import { absolutifyURL, extractNodes, getSrc, isImageSharp } from "./helpers";

describe("Helpers", () => {
    it("correctly detects an imageSharp", () => {
        expect(isImageSharp(imageSharp)).toBeTruthy();
        expect(isImageSharp(image)).toBeFalsy();
    });

    it("returns src for images", () => {
        const fixed: ImageSharp = {
            childImageSharp: {
                ...imageSharp.childImageSharp,
                fluid: imageSharp.childImageSharp.fluid
            }
        };
        expect(getSrc()).toBe("");
        expect(getSrc(image)).toBe(image);
        expect(getSrc(imageSharp)).toBe(
            imageSharp!.childImageSharp!.fluid!.src
        );
        expect(getSrc(fixed)).toBe(imageSharp!.childImageSharp!.fluid!.src);
    });
    it("absolutifies a path", () => {
        expect(absolutifyURL("/assets/foo.txt")).toBe(
            "https://raw.githubusercontent.com/aerian-studios/aerian-site-rebuild/master/static/assets/foo.txt"
        );
    });
    it("doesn't absolutify a non-path", () => {
        expect(absolutifyURL("/foo.txt")).toBe("/foo.txt");
        expect(absolutifyURL((1 as any) as string)).toBe(1);
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
