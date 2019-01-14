/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ImageField } from "../../types/data";
import {
    image,
    imageSharp,
    imageSharpFixed,
    imageSharpFluid
} from "../../types/fixtures";
import { Image } from "./index";

const invalidSharp = { ...imageSharp, childImageSharp: null };

describe("Image", () => {
    it("renders string image correctly", () => {
        const tree = renderer.create(<Image source={image} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders fluid image correctly", () => {
        const tree = renderer
            .create(<Image source={imageSharpFluid} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("handles invalid image", () => {
        // tslint:disable-next-line
        const tree = renderer
            .create(<Image source={(invalidSharp as any) as ImageField} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders fixed image correctly", () => {
        const tree = renderer
            .create(<Image source={imageSharpFixed} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
