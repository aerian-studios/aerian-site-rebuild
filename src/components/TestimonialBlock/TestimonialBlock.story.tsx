
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { testimonial } from "../../types/fixtures";
import { TestimonialBlock } from "./index";

const noImage = {...testimonial, image: undefined}
storiesOf("TestimonialBlock", module).add(
    "With Image",
    withInfo({ inline: true })(() => (
        <TestimonialBlock testimonial={testimonial}
        />
    ))).add(
        "Without Image",
        withInfo({ inline: true })(() => (
            <TestimonialBlock testimonial={noImage}
            />
        )))
