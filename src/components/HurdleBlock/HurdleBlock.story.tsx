import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { hurdle } from "../../types/fixtures";
import { HurdleBlock } from "./index";

storiesOf("HurdleBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => <HurdleBlock hurdle={hurdle} />)
);
