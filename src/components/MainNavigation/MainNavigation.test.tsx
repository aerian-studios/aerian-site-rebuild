/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

// import { MainNavigation } from "./index";

describe("MainNavigation", () =>
    xit("renders correctly", () => {
        const tree = renderer
            .create(<MainNavigation className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
