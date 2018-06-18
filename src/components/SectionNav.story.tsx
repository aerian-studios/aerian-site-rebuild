import * as React from "react";

import { storiesOf } from "@storybook/react";

import { SectionNav } from "./index";


storiesOf("SectionNav", module).add("Default", () => (
    <SectionNav  className="myClass" />
));
