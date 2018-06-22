import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Stat } from "./index";

storiesOf("Stat", module).add(
    "Basic",
    withInfo({ inline: true })(() => (
        <Stat statNumber={477455} statDescription="Total places booked" />
    ))
);
