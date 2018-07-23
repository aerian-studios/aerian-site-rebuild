import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router";
import { about, project } from "../../types/fixtures";
import { OurWorkPage } from "./index";

storiesOf("OurWorkPage", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MemoryRouter>
            <OurWorkPage projects={[project]} page={about} />
        </MemoryRouter>
    ))
);
