import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { ShowcaseCarousel } from "./index";

storiesOf("ShowcaseCarousel", module).add(
    "Default",
    withInfo({ inline: true })(() => <ShowcaseCarousel projects={[project]} />)
);
