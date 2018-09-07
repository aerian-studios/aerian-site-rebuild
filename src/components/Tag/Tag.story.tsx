import * as React from "react";


import { storiesOf } from "@storybook/react";

import { Tag } from "./index";

storiesOf("Tag", module).add(
    "Default",
    (() => <Tag value="Default" />)
);
