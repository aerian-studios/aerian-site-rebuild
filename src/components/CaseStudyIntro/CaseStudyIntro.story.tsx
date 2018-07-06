import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { CaseStudyIntro } from "./index";

storiesOf("CaseStudyIntro", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <CaseStudyIntro project={project} className="myClass" />
    ))
);
