/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { staff } from "../../types/fixtures";
import { StaffGridBlock } from "./index";

describe("StaffGridBlock", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<StaffGridBlock staff={staff} />).toJSON();
        expect(tree).toMatchSnapshot();
    }));
