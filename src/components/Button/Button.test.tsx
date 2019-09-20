import * as React from "react";

import * as renderer from "react-test-renderer";

import { Button } from "./index";

describe("Button", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Button alternate={true} arrow={true}>
                    Hello
                </Button>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
