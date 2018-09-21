import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { OnwardJournies } from "./index";

storiesOf("OnwardJournies", module).add("Default", () => (
    <OnwardJournies projectURL={project.externalUrl} />
));
