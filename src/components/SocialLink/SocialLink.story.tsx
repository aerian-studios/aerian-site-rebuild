
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { SocialLink } from "./index";


storiesOf("SocialLink", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <SocialLink  className="myClass" iconName="facebook" url="www.facebook.com" />
)));
