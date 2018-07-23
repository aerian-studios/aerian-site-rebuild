/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { ContactUsPage } from "./index";

describe("ContactUsPage", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<ContactUsPage />).toJSON();
        expect(tree).toMatchSnapshot();
    }));
