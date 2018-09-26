/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { SocialLink } from "./index";

describe("SocialLink", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SocialLink
                    className="item"
                    icon={faFacebook}
                    url="https://www.facebook.com/aerianstudios/"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
