
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { HeroBlock } from "./index";


storiesOf("HeroBlock", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <HeroBlock  className="myClass" />
)));
