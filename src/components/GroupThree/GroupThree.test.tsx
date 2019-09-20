import * as React from "react";

import * as renderer from "react-test-renderer";

import { GroupThree } from "./index";

describe("GroupThree", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <GroupThree className="myClass">
                    <div style={{ backgroundColor: "red", height: 200 }} />
                    <div style={{ backgroundColor: "green", height: 200 }} />
                    <div style={{ backgroundColor: "blue", height: 200 }} />
                </GroupThree>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
