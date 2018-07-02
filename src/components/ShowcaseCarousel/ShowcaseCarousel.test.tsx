/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ShowcaseCarousel } from "./index";


describe("ShowcaseCarousel", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<ShowcaseCarousel className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));