import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";
import { client } from "../../types/fixtures";
import { ClientGridItem } from "./index";

storiesOf("ClientGridItem", module)
    .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <ClientGridItem client={client} className="myClass" />
        ))
    );
