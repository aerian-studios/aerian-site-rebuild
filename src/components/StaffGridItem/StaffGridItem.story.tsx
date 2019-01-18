import * as React from "react";

import { storiesOf } from "@storybook/react";

import { person } from "../../types/fixtures";
import { StaffGridItem } from "./index";

storiesOf("StaffGridItem", module).add("Default", () => (
    <StaffGridItem
        className="myClass"
        person={person}
        onExpand={() => {
            console.log("clicked");
        }}
    />
));
