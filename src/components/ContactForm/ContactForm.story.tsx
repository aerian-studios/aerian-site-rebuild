import * as React from "react";

import { storiesOf } from "@storybook/react";

import { ContactForm } from "./index";

storiesOf("ContactForm", module).add("Default", () => (
    <ContactForm className="myClass" />
));
