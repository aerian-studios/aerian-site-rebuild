import * as React from "react";

import { storiesOf } from "@storybook/react";

import { staff } from "../../types/fixtures";
import { StaffGridBlock } from "./index";

storiesOf("StaffGridBlock", module).add("Default", () => (
    <StaffGridBlock staff={staff} />
));
