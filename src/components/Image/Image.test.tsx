/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ImageSharp } from "../../types/data";
import { image, imageSharp } from "../../types/fixtures";
import { Image } from "./index";

const invalidSharp = { ...imageSharp, childImageSharp: null };

describe("Image", () => {
    it("renders string image correctly", () => {
        const tree = renderer.create(<Image source={image} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders image sharp correctly", () => {
        const tree = renderer.create(<Image source={imageSharp} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("handles invalid image", () => {
        const tree = renderer.create(<Image source={invalidSharp} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders fixed image correctly", () => {
        const fixed: ImageSharp = {
            childImageSharp: {
                ...imageSharp.childImageSharp,
                fixed: imageSharp.childImageSharp.fluid,
                fluid: null
            }
        };
        const tree = renderer.create(<Image source={fixed} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("returns null for null image", () => {
        const tree = renderer.create(<Image source={null} />).toJSON();
        expect(tree).toBeNull();
    });
});
