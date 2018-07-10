import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientLogo } from "./index";

storiesOf("ClientLogo", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <ClientLogo
            className="myClass"
            client={client}
            style={{ width: 400 }}
        />
    ))
);
