
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ShowcaseCarousel } from "./index";


storiesOf("ShowcaseCarousel", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <ShowcaseCarousel  className="myClass" />
)));