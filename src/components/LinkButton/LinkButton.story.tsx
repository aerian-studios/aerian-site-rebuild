import * as React from "react";

import { storiesOf } from "@storybook/react";

import { LinkButton } from "./index";

storiesOf("LinkButton", module)
    .add("Default", () => <LinkButton to="/">Hello</LinkButton>)
    .add("With arrow", () => (
        <LinkButton to="/" arrow={true}>
            Hello
        </LinkButton>
    ))
    .add("Alternate", () => (
        <div style={{ padding: 200, backgroundColor: "blue" }}>
            <LinkButton to="/" alternate={true}>
                Hello
            </LinkButton>
        </div>
    ))
    .add("Alternate arrow", () => (
        <div style={{ padding: 200, backgroundColor: "blue" }}>
            <LinkButton to="/" alternate={true} arrow={true}>
                Hello
            </LinkButton>
        </div>
    ));
