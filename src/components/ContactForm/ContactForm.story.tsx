
import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ContactForm } from "./index";


storiesOf("ContactForm", module).add(
    "Default", 
    withInfo({ inline: true })(() => (
    <ContactForm  className="myClass" />
)));
