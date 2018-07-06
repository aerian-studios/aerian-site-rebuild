
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { testimonial } from "../../types/fixtures";
import { TestimonialBlock } from "./index";


storiesOf("TestimonialBlock", module).add(
    "Without Image", 
    withInfo({ inline: true })(() => (
    <TestimonialBlock testimonial={testimonial}
    />
    )))
