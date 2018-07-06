/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { VerticalInfographic } from "./index";

describe("VerticalInfographic", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <VerticalInfographic
                    title="Cats"
                    className="myClass"
                    image="http://placekitten.com/100/100"
                    count={10}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
