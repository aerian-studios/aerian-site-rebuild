/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SiteLogo } from "./index";

describe("SiteLogo", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<SiteLogo className="myClass" alt="a logo" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
