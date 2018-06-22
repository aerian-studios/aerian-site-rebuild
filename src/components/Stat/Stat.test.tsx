/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { Stat } from "./index";

describe("Stat", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Stat
                    statNumber={477455}
                    statDescription="Total places booked "
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
        expect(true).toBeTruthy();
    }));
