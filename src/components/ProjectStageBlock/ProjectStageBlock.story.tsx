import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { projectStage } from "../../types/fixtures";
import { ProjectStageBlock } from "./index";

storiesOf("ProjectStageBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <ProjectStageBlock projectStage={projectStage} title="Stage" />
    ))
);
