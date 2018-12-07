import * as React from "react";

import { storiesOf } from "@storybook/react";
import { projectBox } from "../../types/fixtures";
import { ShowcaseCarousel } from "./index";

if (!("IntersectionObserver" in global)) {
    (global as any).IntersectionObserver = jest.fn(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn()
    }));
}

storiesOf("ShowcaseCarousel", module).add("Default", () => (
    <ShowcaseCarousel data={[projectBox]} />
));
