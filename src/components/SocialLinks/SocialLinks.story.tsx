import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { SocialLink } from "../SocialLink";
import { SocialLinks } from "./index";

storiesOf("SocialLinks", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <SocialLinks>
            <SocialLink
                className="myClass"
                iconName="facebook"
                url="https://www.facebook.com"
            />
            <SocialLink
                className="myClass"
                iconName="twitter"
                url="https://www.twitter.com"
            />
            <SocialLink
                className="myClass"
                iconName="instagram"
                url="https://instagram.com"
            />
        </SocialLinks>
    ))
);
