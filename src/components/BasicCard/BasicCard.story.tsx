import * as React from "react";

import { storiesOf } from "@storybook/react";

import { BasicCard } from "./index";

storiesOf("BasicCard", module).add("Default", () => (
    <div
        style={{
            width: 200,
            height: 200,
            borderWidth: 1,
            borderStyle: "solid"
        }}
    >
        <BasicCard>Some text</BasicCard>
    </div>
));
