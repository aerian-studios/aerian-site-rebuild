import * as React from "react";

import { storiesOf } from "@storybook/react";

import { BlockHeader } from "./index";

storiesOf("BlockHeader", module).add("Default", () => (
    <BlockHeader title="foo" text="bar" />
));
