import * as React from "react";

import * as renderer from "react-test-renderer";

import { performance } from "../../types/fixtures";
import { PerformanceBlock } from "./index";

describe("PerformanceBlock", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<PerformanceBlock performance={[performance]} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
