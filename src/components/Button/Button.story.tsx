import * as React from "react";


import { storiesOf } from "@storybook/react";

import { Button } from "./index";

storiesOf("Button", module)
    .add(
        "Default",
        (() => (
            <Button>
                <a href="#">Hello</a>
            </Button>
        ))
    )
    .add(
        "With arrow",
        (() => (
            <Button arrow={true}>
                <a href="#">Hello</a>
            </Button>
        ))
    )
    .add(
        "Alternate",
        (() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true}>
                    <a href="#">Hello</a>
                </Button>
            </div>
        ))
    )
    .add(
        "Alternate arrow",
        (() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true} arrow={true}>
                    <a href="#">Hello</a>
                </Button>
            </div>
        ))
    );
