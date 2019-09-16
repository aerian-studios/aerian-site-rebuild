import * as React from "react";

import * as renderer from "react-test-renderer";

import { BlockHeader } from "./index";

describe("BlockHeader", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<BlockHeader title="foo" text="bar" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
