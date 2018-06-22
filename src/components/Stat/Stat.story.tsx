
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { Stat } from "./index";


storiesOf("Stat", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <Stat  className="myClass" />
)));
