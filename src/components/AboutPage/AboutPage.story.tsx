import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { about, client } from "../../types/fixtures";
import { AboutPage } from "./index";

storiesOf("AboutPage", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MemoryRouter>
            <AboutPage page={about} clients={[client]} />
        </MemoryRouter>
    ))
);
