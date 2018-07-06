/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { BlockHeader } from "./index";


describe("BlockHeader", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<BlockHeader className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));