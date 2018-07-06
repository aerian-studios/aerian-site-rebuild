/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { testimonial } from "../../types/fixtures";
import { TestimonialBlock } from "./index";


describe("TestimonialBlock", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<TestimonialBlock className="myClass" testimonial={testimonial} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));