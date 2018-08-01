import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { whatWeDo } from "../../types/fixtures";
import { WhatWeDoPage } from "./index";

storiesOf("WhatWeDoPage", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MemoryRouter>
            <WhatWeDoPage page={whatWeDo} />
        </MemoryRouter>
    ))
);
