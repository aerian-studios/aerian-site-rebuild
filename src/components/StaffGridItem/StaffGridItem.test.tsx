import * as React from "react";

import * as renderer from "react-test-renderer";

import { person } from "../../types/fixtures";
import { StaffGridItem } from "./index";

describe("StaffGridItem", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <StaffGridItem
                    className="myClass"
                    person={person}
                    onExpand={jest.fn()}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
