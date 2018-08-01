import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Block } from "./index";

storiesOf("Block", module)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <Block>
                <p>Some content</p>
            </Block>
        ))
    )
    .add(
        "Alternate",
        withInfo({ inline: true })(() => (
            <Block alternate={true}>
                <p>Some content</p>
            </Block>
        ))
    );
