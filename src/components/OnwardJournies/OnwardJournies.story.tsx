import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { project } from "../../types/fixtures";
import { OnwardJournies } from "./index";

storiesOf("OnwardJournies", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <OnwardJournies projectURL={project.externalUrl} />
    ))
);
