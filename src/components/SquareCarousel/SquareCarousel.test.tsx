/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SquareCarousel } from "./index";

const data = [];
describe("SquareCarousel", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<SquareCarousel className="myClass" data={data} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
