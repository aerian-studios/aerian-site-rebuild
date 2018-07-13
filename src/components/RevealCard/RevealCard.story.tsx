
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { RevealCard } from "./index";


storiesOf("RevealCard", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <RevealCard  className="myClass" />
)));
