import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { ProjectPage } from "./index";

storiesOf("ProjectPage", module).add("Default", () => (
    <ProjectPage project={project} />
));
