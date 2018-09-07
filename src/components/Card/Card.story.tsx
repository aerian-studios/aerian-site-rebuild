import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Card } from "./index";

storiesOf("Card", module).add("Default", () => (
    <Card>
        <div className="content">
            <h3>Title</h3>
            <p>Some content</p>
            <button>This is a button</button>
        </div>
    </Card>
));
