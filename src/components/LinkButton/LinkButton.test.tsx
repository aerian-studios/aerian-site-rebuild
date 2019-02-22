/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { LinkButton } from "./index";

describe("LinkButton", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<LinkButton to="/" className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
