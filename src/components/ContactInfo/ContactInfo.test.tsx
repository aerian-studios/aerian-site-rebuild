/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactInfo } from "./index";

describe("ContactInfo", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ContactInfo className="myClass" title="Test title" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
