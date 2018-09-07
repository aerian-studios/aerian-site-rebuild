import * as React from "react";

import { storiesOf } from "@storybook/react";

import { HalfBlock } from "./index";

storiesOf("HalfBlock", module).add("Default", () => (
    <HalfBlock className="myClass" />
));
