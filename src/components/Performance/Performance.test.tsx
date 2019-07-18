import * as React from "react";

import * as renderer from "react-test-renderer";
import { performance } from "../../types/fixtures";
import { Performance } from "./index";

describe("Performance", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<Performance performance={performance} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect(true).toBeTruthy();
    }));
