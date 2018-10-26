import * as React from "react";

import { storiesOf } from "@storybook/react";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { SocialLink } from "./index";

storiesOf("SocialLink", module).add("Default", () => (
    <SocialLink
        className="item"
        icon={faFacebook}
        url="https://www.facebook.com"
    />
));
