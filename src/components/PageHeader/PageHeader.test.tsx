/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { PageHeader } from "./index";


describe("PageHeader", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<PageHeader className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));