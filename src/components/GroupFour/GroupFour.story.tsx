import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { GroupFour } from "./index";

storiesOf("GroupFour", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <GroupFour>
            <div style={{ backgroundColor: "red", height: 200 }} />
            <div style={{ backgroundColor: "yellow", height: 200 }} />
            <div style={{ backgroundColor: "green", height: 200 }} />
            <div style={{ backgroundColor: "blue", height: 200 }} />
        </GroupFour>
    ))
);
