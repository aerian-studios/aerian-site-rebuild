import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientGridBlock } from "./index";

storiesOf("ClientGridBlock", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <ClientGridBlock clients={[client]} className="myClass" />
    ))
);
