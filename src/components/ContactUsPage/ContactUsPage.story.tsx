import * as React from "react";


import { storiesOf } from "@storybook/react";

import { ContactUsPage } from "./index";

storiesOf("ContactUsPage", module).add(
    "Default",
    (() => <ContactUsPage />)
);
