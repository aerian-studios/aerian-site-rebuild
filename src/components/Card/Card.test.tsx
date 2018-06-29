/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Card } from "./index";

describe("Card", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<Card className="myClass" link="/my-bogus-site" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
