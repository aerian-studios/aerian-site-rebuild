/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SlidingCarousel } from "./index";


describe("SlidingCarousel", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<SlidingCarousel className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));