import * as React from "react";


import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientGridItem } from "./index";

storiesOf("ClientGridItem", module).add(
    "Default",
    (() => (
        <ClientGridItem client={client} className="myClass" />
    ))
);
