import * as React from "react";

import { storiesOf } from "@storybook/react";

import { projectStage } from "../../types/fixtures";
import { ProjectStageBlock } from "./index";

storiesOf("ProjectStageBlock", module).add("Default", () => (
    <ProjectStageBlock projectStage={projectStage} title="Stage" />
));
