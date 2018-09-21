import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Block } from "./index";

storiesOf("Block", module)
    .add("Default", () => (
        <Block>
            <p>Some content</p>
        </Block>
    ))
    .add("Alternate", () => (
        <Block alternate={true}>
            <p>Some content</p>
        </Block>
    ));
