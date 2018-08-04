/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Button } from "./index";

describe("Button", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Button alternate={true} arrow={true}>
                    <a href="#">Hello</a>
                </Button>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
