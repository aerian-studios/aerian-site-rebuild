import * as React from "react";

import { storiesOf } from "@storybook/react";

import { MainNavigation } from "./index";


storiesOf("MainNavigation", module).add("Default", () => (
    <MainNavigation  className="myClass" />
));
