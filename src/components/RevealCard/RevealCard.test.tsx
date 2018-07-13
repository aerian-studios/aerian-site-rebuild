/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { RevealCard } from "./index";


describe("RevealCard", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<RevealCard className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));