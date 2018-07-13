/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SocialLink } from "./index";

describe("SocialLink", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SocialLink
                    className="item"
                    iconName="facebook-f"
                    url="https://www.facebook.com/aerianstudios/"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
