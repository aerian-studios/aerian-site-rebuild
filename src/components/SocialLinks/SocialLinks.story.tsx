import * as React from "react";

import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";

import { PageFooter } from "../PageFooter";
import { SocialLink } from "../SocialLink";
import { SocialLinks } from "./index";

storiesOf("SocialLinks", module).add(
    "Default",
    withInfo({ inline: true })(() => (
        <PageFooter>
            <SocialLinks>
                <SocialLink
                    className="item"
                    iconName="facebook-f"
                    url="https://www.facebook.com/aerianstudios/"
                />
                <SocialLink
                    className="item"
                    iconName="twitter"
                    url="https://twitter.com/aerianstudios"
                />
                <SocialLink
                    className="item"
                    iconName="linkedin-in"
                    url="https://www.linkedin.com/company/aerian-studios"
                />
                <SocialLink
                    className="item"
                    iconName="vimeo-v"
                    url="https://vimeo.com/aerianstudios"
                />
            </SocialLinks>
        </PageFooter>
    ))
);
