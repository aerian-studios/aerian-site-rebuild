
import * as React from "react";


import { storiesOf } from "@storybook/react";

import { ContactInfo } from "./index";


storiesOf("ContactInfo", module).add(
    "Default", 
    (() => (
    <ContactInfo  className="myClass" />
)));
