
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { HalfBlock } from "./index";


storiesOf("HalfBlock", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <HalfBlock  className="myClass" />
)));
