
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { SocialGrid } from "./index";


storiesOf("SocialGrid", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <SocialGrid  className="myClass" />
)));
