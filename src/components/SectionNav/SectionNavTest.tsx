/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SectionNav } from "./index";


describe("SectionNav", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<SectionNav className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));

