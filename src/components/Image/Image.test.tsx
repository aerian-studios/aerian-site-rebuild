/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { image } from "../../types/fixtures";
import { Image } from "./index";

describe("Image", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<Image source={image} />).toJSON();
        expect(tree).toMatchSnapshot();
    }));
