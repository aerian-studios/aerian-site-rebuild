import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { about, client } from "../../types/fixtures";
import { AboutPage } from "./index";

storiesOf("AboutPage", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <AboutPage page={about} clients={[client]} />
    ))
);
