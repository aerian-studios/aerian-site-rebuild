import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { GroupThree } from "./index";

storiesOf("GroupThree", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <GroupThree className="myClass">
            <div style={{ backgroundColor: "red", height: 200 }} />
            <div style={{ backgroundColor: "green", height: 200 }} />
            <div style={{ backgroundColor: "blue", height: 200 }} />
        </GroupThree>
    ))
);
