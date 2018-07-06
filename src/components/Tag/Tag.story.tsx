import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Tag } from "./index";

storiesOf("Tag", module).add(
    "Default",
    withInfo({ inline: true })(() => <Tag value="Default" />)
);
