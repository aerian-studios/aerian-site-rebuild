import * as React from "react";


import { storiesOf } from "@storybook/react";

import { GroupThree } from "./index";

storiesOf("GroupThree", module).add(
    "Default",
    (() => (
        <GroupThree className="myClass">
            <div style={{ backgroundColor: "red", height: 200 }} />
            <div style={{ backgroundColor: "green", height: 200 }} />
            <div style={{ backgroundColor: "blue", height: 200 }} />
        </GroupThree>
    ))
);
