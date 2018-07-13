import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MapView } from "./index";

storiesOf("MapView", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <MapView position={[51.4194618, -2.2542012]} />
    ))
);
