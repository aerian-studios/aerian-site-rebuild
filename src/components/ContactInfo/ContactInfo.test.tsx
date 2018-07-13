/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactInfo } from "./index";


describe("ContactInfo", () => (
    it("renders correctly", () => {
        const tree = renderer
            .create(<ContactInfo className="myClass" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
));