/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MapView } from "./index";


describe("MapView", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<MapView className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));