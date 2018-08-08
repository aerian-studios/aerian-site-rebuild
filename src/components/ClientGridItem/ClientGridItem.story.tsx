import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientGridItem } from "./index";

storiesOf("ClientGridItem", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <ClientGridItem client={client} className="myClass" />
    ))
);
