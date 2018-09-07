import * as React from "react";


import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientGridBlock } from "./index";

storiesOf("ClientGridBlock", module).add(
    "Default",
    (() => (
        <ClientGridBlock clients={[client]} className="myClass" />
    ))
);
