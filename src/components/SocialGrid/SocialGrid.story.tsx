
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { SocialGrid } from "./index";


storiesOf("SocialGrid", module).add(
    "Default", 
    (() => (
    <SocialGrid  className="myClass" />
)));
