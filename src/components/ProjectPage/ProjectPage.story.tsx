import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project, projectBox } from "../../types/fixtures";
import { ProjectPage } from "./index";

const projectPage = [{ node: projectBox }];

storiesOf("ProjectPage", module).add("Default", () => (
    <ProjectPage project={project} allProjects={projectPage} />
));
