import * as React from "react";

import { storiesOf } from "@storybook/react";

import { SocialLink } from "./index";

storiesOf("SocialLink", module).add("Default", () => (
    <SocialLink
        className="item"
        iconName="facebook-f"
        url="https://www.facebook.com"
    />
));
