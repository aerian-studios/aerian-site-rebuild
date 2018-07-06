/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Tag } from "./index";

describe("Tag", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<Tag className="myClass" value="Default" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
