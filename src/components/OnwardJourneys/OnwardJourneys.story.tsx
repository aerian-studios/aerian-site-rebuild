import * as React from "react";

import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { OnwardJourneys } from "./index";

storiesOf("OnwardJourneys", module).add("Default", () => (
    <OnwardJourneys projectURL={project.externalUrl} />
));
