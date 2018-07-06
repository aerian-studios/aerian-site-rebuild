/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SocialGrid } from "./index";


describe("SocialGrid", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<SocialGrid className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));