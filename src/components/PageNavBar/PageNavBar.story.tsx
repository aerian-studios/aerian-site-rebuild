import * as React from "react";

import { storiesOf } from "@storybook/react";

import { PageNavBar } from "./index";

storiesOf("PageNavBar", module).add("Default", () => (
    <PageNavBar className="myClass" />
));
