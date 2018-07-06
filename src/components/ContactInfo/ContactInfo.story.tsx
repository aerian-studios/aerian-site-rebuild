
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ContactInfo } from "./index";


storiesOf("ContactInfo", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <ContactInfo  className="myClass" />
)));
