/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SocialLinks } from "./index";


describe("SocialLinks", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<SocialLinks className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));