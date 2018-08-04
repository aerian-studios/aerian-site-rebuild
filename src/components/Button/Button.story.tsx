import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Button } from "./index";

storiesOf("Button", module)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <Button>
                <a href="#">Hello</a>
            </Button>
        ))
    )
    .add(
        "With arrow",
        withInfo({ inline: true })(() => (
            <Button arrow={true}>
                <a href="#">Hello</a>
            </Button>
        ))
    )
    .add(
        "Alternate",
        withInfo({ inline: true })(() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true}>
                    <a href="#">Hello</a>
                </Button>
            </div>
        ))
    )
    .add(
        "Alternate arrow",
        withInfo({ inline: true })(() => (
            <div style={{ padding: 200, backgroundColor: "blue" }}>
                <Button alternate={true} arrow={true}>
                    <a href="#">Hello</a>
                </Button>
            </div>
        ))
    );
