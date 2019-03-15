/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { projectBox } from "../../types/fixtures";
import { SlidingCarousel } from "./index";

describe("SlidingCarousel", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<SlidingCarousel wrapperClassName="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with infinite set", () => {
        const tree = renderer
            .create(
                <SlidingCarousel wrapperClassName="myClass" infinite={true}>
                    <div>{projectBox.titleLineOne}</div>
                </SlidingCarousel>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
