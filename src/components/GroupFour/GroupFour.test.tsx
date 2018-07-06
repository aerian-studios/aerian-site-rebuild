/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { GroupFour } from "./index";


describe("GroupFour", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<GroupFour className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));