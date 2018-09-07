import * as React from "react";


import { storiesOf } from "@storybook/react";

import { MapView } from "./index";

storiesOf("MapView", module).add(
    "Default",
    (() => (
        <MapView position={[51.4194618, -2.2542012]} />
    ))
);
