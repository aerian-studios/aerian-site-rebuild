import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { CaseStudyIntro } from "./index";

storiesOf("CaseStudyIntro", module).add("Default", () => (
    <CaseStudyIntro project={project} className="myClass" />
));
