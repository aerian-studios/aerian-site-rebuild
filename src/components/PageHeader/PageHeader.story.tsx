import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { PageHeader } from "./index";

storiesOf("PageHeader", module)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <PageHeader className="myClass" message="Yay!" />
        ))
    )
    .add(
        "Blue",
        withInfo({ inline: true })(() => (
            <PageHeader
                style={{ borderColor: "blue" }}
                className="myClass"
                message="Yay!"
            />
        ))
    );
