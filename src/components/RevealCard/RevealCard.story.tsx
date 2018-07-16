import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router";
import { project } from "../../types/fixtures";
import { RevealCard } from "./index";

storiesOf("RevealCard", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MemoryRouter>
            <RevealCard className="myClass" project={project} />
        </MemoryRouter>
    ))
);
