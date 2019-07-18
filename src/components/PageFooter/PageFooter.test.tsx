/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { PageFooter } from "./index";

describe("PageFooter", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<PageFooter className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
