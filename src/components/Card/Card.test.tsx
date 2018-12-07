/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Card } from "./index";

describe("Card", () => {
    it("renders correctly", () => {
        const card = renderer.create(
            <Card>
                <p>Hi</p>
            </Card>
        );
        const tree = card.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
