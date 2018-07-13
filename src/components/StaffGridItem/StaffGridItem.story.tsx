import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { person } from "../../types/fixtures";
import { StaffGridItem } from "./index";

storiesOf("StaffGridItem", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <StaffGridItem className="myClass" person={person} />
    ))
);
