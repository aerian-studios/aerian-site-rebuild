import * as React from "react";

import * as renderer from "react-test-renderer";

import { HalfBlock } from "./index";

describe("HalfBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<HalfBlock className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
