import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { performance } from "../../types/fixtures";
import { PerformanceBlock } from "./index";

storiesOf("PerformanceBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <PerformanceBlock performance={[performance]} />
    ))
);
