import * as React from "react";


import { storiesOf } from "@storybook/react";

import { PageHeader } from "./index";

storiesOf("PageHeader", module)
    .add(
        "Default",
        (() => (
            <PageHeader className="myClass" message="Yay!" />
        ))
    )
    .add(
        "Blue",
        (() => (
            <PageHeader
                style={{ borderColor: "blue" }}
                className="myClass"
                message="Yay!"
            />
        ))
    );
