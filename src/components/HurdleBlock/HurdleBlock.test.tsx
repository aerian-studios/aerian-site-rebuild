/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { hurdle } from "../../types/fixtures";
import { HurdleBlock } from "./index";

describe("HurdleBlock", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<HurdleBlock hurdle={hurdle} />).toJSON();
        expect(tree).toMatchSnapshot();
    }));
