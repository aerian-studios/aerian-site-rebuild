
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { BlockHeader } from "./index";


storiesOf("BlockHeader", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <BlockHeader  className="myClass" />
)));
