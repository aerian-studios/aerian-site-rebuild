import * as React from "react";
import * as renderer from "react-test-renderer";
import { whatWeDo } from "../../types/fixtures";
import { WhatWeDoPage } from "./index";

describe("WhatWeDoPage", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<WhatWeDoPage page={whatWeDo} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
