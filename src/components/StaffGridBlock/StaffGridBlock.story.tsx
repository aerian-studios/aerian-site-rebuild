import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { staff } from "../../types/fixtures";
import { StaffGridBlock } from "./index";

storiesOf("StaffGridBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => <StaffGridBlock staff={staff} />)
);
