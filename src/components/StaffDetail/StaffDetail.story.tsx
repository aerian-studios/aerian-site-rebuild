import * as React from "react";


import { storiesOf } from "@storybook/react";

import { person } from "../../types/fixtures";
import { StaffDetail } from "./index";

storiesOf("StaffDetail", module).add(
    "Default",
    (() => <StaffDetail staff={person} />)
);
