import * as React from "react";

import { storiesOf } from "@storybook/react";

import { testimonial } from "../../types/fixtures";
import { TestimonialBlock } from "./index";

const noImage = { ...testimonial, image: undefined };
storiesOf("TestimonialBlock", module)
    .add("With Image", () => <TestimonialBlock testimonial={testimonial} />)
    .add("Without Image", () => <TestimonialBlock testimonial={noImage} />);
