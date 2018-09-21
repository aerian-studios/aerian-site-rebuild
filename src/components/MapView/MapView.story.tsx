import * as React from "react";

import { storiesOf } from "@storybook/react";

import { MapView } from "./index";

storiesOf("MapView", module).add("Default", () => (
    <div>
        <MapView position={[51.41942, -2.253581]} style={{ height: 400 }} />
    </div>
));
