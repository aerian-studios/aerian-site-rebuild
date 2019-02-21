
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { SiteLogo } from "./index";


storiesOf("SiteLogo", module).add(
    "Default", 
    () => (
    <SiteLogo  className="myClass" />
));
