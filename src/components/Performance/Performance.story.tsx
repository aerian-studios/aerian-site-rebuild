import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import { performance } from "../../types/fixtures";
import { Performance } from "./index";

storiesOf("Performance", module).add(
    "Basic",
    withInfo({ inline: true })(() => <Performance performance={performance} />)
);
