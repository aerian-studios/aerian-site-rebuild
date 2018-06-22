import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { VerticalInfographic } from "./index";

storiesOf("VerticalInfographic", module)
    .add(
        "Default",
        withInfo({ inline: true })(() => (
            <VerticalInfographic
                title="BEARDS"
                className="myClass"
                image="http://placekitten.com/100/100"
                count="8"
            />
        ))
    )
    .add(
        "Other",
        withInfo({ inline: true })(() => (
            <VerticalInfographic
                title="Cats"
                className="myClass"
                image="http://placekitten.com/100/100"
                count="10"
            />
        ))
    );
