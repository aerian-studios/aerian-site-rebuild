/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SquareCard } from "./index";
import { projectBox } from "../../types/fixtures";

describe("SquareCard", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<SquareCard className="myClass" project={projectBox} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
