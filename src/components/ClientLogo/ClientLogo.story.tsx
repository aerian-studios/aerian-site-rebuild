import * as React from "react";

import { storiesOf } from "@storybook/react";

import { client } from "../../types/fixtures";
import { ClientLogo } from "./index";

storiesOf("ClientLogo", module).add("Default", () => (
    <ClientLogo className="myClass" client={client} style={{ width: 400 }} />
));
