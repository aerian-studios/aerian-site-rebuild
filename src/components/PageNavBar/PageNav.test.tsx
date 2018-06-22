/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

// import { PageNavBar } from "./index";

describe("PageNavBar", () =>
    xit("renders correctly", () => {
        const tree = renderer
            .create(<PageNavBar className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
