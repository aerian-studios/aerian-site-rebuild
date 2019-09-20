import * as React from "react";

import * as renderer from "react-test-renderer";

import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faVimeoV } from "@fortawesome/free-brands-svg-icons/faVimeoV";
import { SocialLink } from "../SocialLink";
import { SocialLinks } from "./index";

describe("SocialLinks", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SocialLinks>
                    <SocialLink
                        className="item"
                        icon={faFacebook}
                        url="https://www.facebook.com/aerianstudios/"
                    />
                    <SocialLink
                        className="item"
                        icon={faTwitter}
                        url="https://twitter.com/aerianstudios"
                    />
                    <SocialLink
                        className="item"
                        icon={faLinkedin}
                        url="https://www.linkedin.com/company/aerian-studios"
                    />
                    <SocialLink
                        className="item"
                        icon={faVimeoV}
                        url="https://vimeo.com/aerianstudios"
                    />
                </SocialLinks>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
