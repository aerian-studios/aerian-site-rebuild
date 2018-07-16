import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { SocialLink } from "./index";

storiesOf("SocialLink", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <SocialLink
            className="item"
            iconName="facebook-f"
            url="https://www.facebook.com"
        />
    ))
);
