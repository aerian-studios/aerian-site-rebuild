import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { ProjectPage } from "./index";

storiesOf("ProjectPage", module).add(
    "Default",
    withInfo({ inline: true })(() => <ProjectPage project={project} />)
);
