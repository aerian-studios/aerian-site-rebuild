import * as React from "react";

import * as renderer from "react-test-renderer";

import { Block } from "./index";

describe("Block", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Block className="myClass" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("correctly adds 'alternate' classes", () => {
        const tree = renderer
            .create(<Block className="myClass" alternate={true} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
        expect(tree && tree.props.className.length).toBeGreaterThan(
            "myClass".length
        );
    });
});
