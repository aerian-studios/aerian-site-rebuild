/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";
import { infographic } from "../../types/fixtures";

import { VerticalInfographic } from "./index";

describe("VerticalInfographic", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<VerticalInfographic infographic={infographic} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
