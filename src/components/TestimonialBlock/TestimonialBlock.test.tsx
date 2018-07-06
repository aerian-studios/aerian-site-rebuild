/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { TestimonialBlock } from "./index";


describe("TestimonialBlock", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<TestimonialBlock className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));