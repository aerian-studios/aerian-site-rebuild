import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { Gallery } from "./index";

storiesOf("Gallery", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <Gallery gallery={project.gallery} className="myClass" />
    ))
);
