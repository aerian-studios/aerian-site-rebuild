import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { person } from "../../types/fixtures";
import { StaffDetail } from "./index";

storiesOf("StaffDetail", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <StaffDetail className="myClass" staff={person} />
    ))
);
