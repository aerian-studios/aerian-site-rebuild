/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { projectBox } from "../../types/fixtures";
import {
    calculateNearestSnapPoint,
    calculateScrollOffsetForIndex,
    SlidingCarouselProvider
} from "./index";
import { Size } from "./SlidingCarouselProvider";

describe("SlidingCarouselProvider", () => {
    const childSizes: Size[] = [
        { width: 106, height: 306 },
        { width: 206, height: 306 },
        { width: 306, height: 306 },
        { width: 406, height: 306 }
    ];

    it("renders correctly", () => {
        const tree = renderer
            .create(<SlidingCarouselProvider carouselLabel="SUT" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with infinite set", () => {
        const tree = renderer
            .create(
                <SlidingCarouselProvider infinite={true} carouselLabel="SUT" />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("correctly calculates index offset, left aligned", () => {
        const first = calculateScrollOffsetForIndex(0, childSizes, 0);
        const second = calculateScrollOffsetForIndex(1, childSizes, 0);
        const third = calculateScrollOffsetForIndex(2, childSizes, 0);
        const fourth = calculateScrollOffsetForIndex(3, childSizes, 0);

        expect(first).toEqual(0);
        expect(second).toEqual(106);
        expect(third).toEqual(312);
        expect(fourth).toEqual(618);
    });

    it("correctly calculates index offset, centre aligned", () => {
        const first = calculateScrollOffsetForIndex(0, childSizes, 300);
        const second = calculateScrollOffsetForIndex(1, childSizes, 300);
        const third = calculateScrollOffsetForIndex(2, childSizes, 300);
        const fourth = calculateScrollOffsetForIndex(3, childSizes, 300);
        expect(first).toEqual(-300 + childSizes[0].width / 2);
        expect(second).toEqual(
            -300 + childSizes[0].width + childSizes[1].width / 2
        );
        expect(third).toEqual(
            -300 +
                childSizes[0].width +
                childSizes[1].width +
                childSizes[2].width / 2
        );
        expect(fourth).toEqual(
            -300 +
                childSizes[0].width +
                childSizes[1].width +
                childSizes[2].width +
                childSizes[3].width / 2
        );
    });

    it("correctly calculates snap offset, left aligned", () => {
        const first = calculateNearestSnapPoint(0, childSizes, 0);
        const second = calculateNearestSnapPoint(300, childSizes, 0);
        const third = calculateNearestSnapPoint(309, childSizes, 0);
        const fourth = calculateNearestSnapPoint(600, childSizes, 0);

        expect(first).toEqual(0);
        expect(second).toEqual(312);
        expect(third).toEqual(312);
        expect(fourth).toEqual(618);
    });

    it("correctly calculates snap offset, centre aligned", () => {
        const first = calculateNearestSnapPoint(0, childSizes, 300);
        const second = calculateNearestSnapPoint(300, childSizes, 300);
        const third = calculateNearestSnapPoint(309, childSizes, 300);
        const fourth = calculateNearestSnapPoint(600, childSizes, 300);

        expect(first).toEqual(-300 + childSizes[0].width / 2);
        expect(second).toEqual(-300 + 312 + childSizes[2].width / 2);
        expect(third).toEqual(-300 + 312 + childSizes[2].width / 2);
        expect(fourth).toEqual(-300 + 618 + childSizes[3].width / 2);
    });
});
