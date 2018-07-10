/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Block } from "./index";


describe("Block", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<Block className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));