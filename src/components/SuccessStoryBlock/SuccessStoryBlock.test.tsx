import * as React from "react";

import * as renderer from "react-test-renderer";

import { successStory } from "../../types/fixtures";
import { SuccessStoryBlock } from "./index";

describe("SuccessStoryBlock", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<SuccessStoryBlock successStory={successStory} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
