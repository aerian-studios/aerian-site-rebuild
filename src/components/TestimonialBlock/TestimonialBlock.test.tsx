/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { testimonial } from "../../types/fixtures";
import { TestimonialBlock } from "./index";
const noImageTestimonial = { ...testimonial, image: undefined }

describe("TestimonialBlock", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<TestimonialBlock className="myClass" testimonial={testimonial} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("renders correctly without an image", () => {
        const tree = renderer
            .create(<TestimonialBlock className="myClass" testimonial={noImageTestimonial} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
});