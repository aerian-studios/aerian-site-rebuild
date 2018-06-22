
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { SocialLinks } from "./index";


storiesOf("SocialLinks", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <SocialLinks  className="myClass" />
)));
