import * as React from "react";


import { storiesOf } from "@storybook/react";

import { about, project } from "../../types/fixtures";
import { OurWorkPage } from "./index";

storiesOf("OurWorkPage", module).add(
    "Default",
    (() => (
        <OurWorkPage projects={[project]} page={about} />
    ))
);
