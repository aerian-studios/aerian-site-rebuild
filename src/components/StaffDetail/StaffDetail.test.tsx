/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { StaffDetail } from "./index";

import { person } from "../../types/fixtures";

describe("StaffDetail", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<StaffDetail staff={person} />).toJSON();
        expect(tree).toMatchSnapshot();
    }));
