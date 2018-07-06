import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";
import { client } from "../../types/fixtures";
import { ClientGridBlock } from "./index";

storiesOf("ClientGridBlock", module)
    .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <ClientGridBlock clients={[client]} className="myClass" />
        ))
    );
