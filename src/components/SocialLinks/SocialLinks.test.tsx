/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SocialLink } from "../SocialLink";
import { SocialLinks } from "./index";

describe("SocialLinks", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
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
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
