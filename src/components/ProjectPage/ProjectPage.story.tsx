import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router";
import { project } from "../../types/fixtures";
import { ProjectPage } from "./index";

storiesOf("ProjectPage", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MemoryRouter>
            <ProjectPage project={project} />
        </MemoryRouter>
    ))
);
