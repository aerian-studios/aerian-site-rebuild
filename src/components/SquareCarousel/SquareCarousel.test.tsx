/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { projectBox } from "../../types/fixtures";
import { SquareCarousel } from "./index";

const data = [{ node: projectBox }];
describe("SquareCarousel", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<SquareCarousel className="myClass" data={data} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
