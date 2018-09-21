import * as React from "react";


import { storiesOf } from "@storybook/react";

import { Button } from "./index";

storiesOf("Button", module)
    .add(
        "Default",
        (() => (
            <Button>
                Hello
            </Button>
        ))
    )
    .add(
        "With arrow",
        (() => (
            <Button arrow={true}>
                Hello
            </Button>
        ))
    )
    .add(
        "Alternate",
        (() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true}>Hello</Button>
            </div>
        ))
    )
    .add(
        "Alternate arrow",
        (() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true} arrow={true}>
                    Hello
                </Button>
            </div>
        ))
    );
