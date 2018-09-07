import * as React from "react";


import { storiesOf } from "@storybook/react";

import { performance } from "../../types/fixtures";
import { PerformanceBlock } from "./index";

storiesOf("PerformanceBlock", module).add(
    "Default",
    (() => (
        <PerformanceBlock performance={[performance]} />
    ))
);
