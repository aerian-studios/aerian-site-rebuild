
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Block } from "./index";


storiesOf("Block", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <Block  className="myClass" />
)));
