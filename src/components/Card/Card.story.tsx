import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Card } from "./index";

storiesOf("Card", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <Card>
            <div className="content">
                <h3>Title</h3>
                <p>Some content</p>
                <button>This is a button</button>
            </div>
        </Card>
    ))
);
