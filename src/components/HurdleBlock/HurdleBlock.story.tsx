import * as React from "react";

import { storiesOf } from "@storybook/react";

import { hurdle } from "../../types/fixtures";
import { HurdleBlock } from "./index";

storiesOf("HurdleBlock", module).add("Default", () => (
    <HurdleBlock hurdle={hurdle} />
));
