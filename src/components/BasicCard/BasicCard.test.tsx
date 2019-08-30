import * as React from "react";

import * as renderer from "react-test-renderer";

import { BasicCard } from ".";

describe("BasicCard", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <BasicCard>
                    <p>Hi</p>
                </BasicCard>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
