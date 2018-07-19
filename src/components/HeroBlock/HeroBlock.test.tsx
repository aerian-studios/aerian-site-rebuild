/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { HeroBlock } from "./index";


describe("HeroBlock", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<HeroBlock className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));