import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { ContactUsPage } from "./index";

storiesOf("ContactUsPage", module).add(
    "Default",
    withInfo({ inline: true })(() => <ContactUsPage />)
);
