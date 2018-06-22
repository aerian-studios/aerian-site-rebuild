/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Stat } from "./index";


describe("Stat", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<Stat className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));