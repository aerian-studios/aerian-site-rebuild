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
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
