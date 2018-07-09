import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";
import { project } from "../../types/fixtures";
import { ShowcaseCarousel } from "./index";

storiesOf("ShowcaseCarousel", module)
    .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <ShowcaseCarousel projects={[project]} />
        ))
    );
