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

const combineWidths = (
    widths: Size[],
    amount: number,
    centred = false
): number => {
    let i = 0;
    let lastElW;
    const width = widths.reduce((prev: number, current: Size): number => {
        i++;
        if (i > amount) {
            if (i - 1 === amount) {
                lastElW = widths[i - 1].width;
            }
            return prev;
        }
        lastElW = current.width;
        return prev + lastElW;
    }, 0);

    return centred && lastElW ? width + lastElW * 0.5 : width;
};

describe("SlidingCarouselProvider", () => {
    const childSizes: Size[] = [
        { width: 306, height: 306 }, // 0
        { width: 306, height: 306 }, // 306
        { width: 306, height: 306 }, // 612
        { width: 306, height: 306 } // 918
    ];
    const childSizesIrregular: Size[] = [
        { width: 106, height: 306 }, // 0
        { width: 206, height: 306 }, // 106
        { width: 306, height: 306 }, // 312
        { width: 406, height: 306 } // 618
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

    it("correctly calculates index offset, left aligned (even childSizes)", () => {
        const first = calculateScrollOffsetForIndex(0, childSizes, 0);
        const second = calculateScrollOffsetForIndex(1, childSizes, 0);
        const third = calculateScrollOffsetForIndex(2, childSizes, 0);
        const fourth = calculateScrollOffsetForIndex(3, childSizes, 0);

        expect(first).toEqual(0);
        expect(second).toEqual(306);
        expect(third).toEqual(612);
        expect(fourth).toEqual(918);
    });

    it("correctly calculates index offset, left aligned (irregular childSizes)", () => {
        const first = calculateScrollOffsetForIndex(0, childSizesIrregular, 0);
        const second = calculateScrollOffsetForIndex(1, childSizesIrregular, 0);
        const third = calculateScrollOffsetForIndex(2, childSizesIrregular, 0);
        const fourth = calculateScrollOffsetForIndex(3, childSizesIrregular, 0);

        expect(first).toEqual(0);
        expect(second).toEqual(106);
        expect(third).toEqual(312);
        expect(fourth).toEqual(618);
    });

    it("correctly calculates index offset, centre aligned (regular)", () => {
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

    it("correctly calculates index offset, centre aligned (irregular)", () => {
        const first = calculateScrollOffsetForIndex(
            0,
            childSizesIrregular,
            300
        );
        const second = calculateScrollOffsetForIndex(
            1,
            childSizesIrregular,
            300
        );
        const third = calculateScrollOffsetForIndex(
            2,
            childSizesIrregular,
            300
        );
        const fourth = calculateScrollOffsetForIndex(
            3,
            childSizesIrregular,
            300
        );
        expect(first).toEqual(-300 + childSizesIrregular[0].width / 2);
        expect(second).toEqual(
            -300 +
                childSizesIrregular[0].width +
                childSizesIrregular[1].width / 2
        );
        expect(third).toEqual(
            -300 +
                childSizesIrregular[0].width +
                childSizesIrregular[1].width +
                childSizesIrregular[2].width / 2
        );
        expect(fourth).toEqual(
            -300 +
                childSizesIrregular[0].width +
                childSizesIrregular[1].width +
                childSizesIrregular[2].width +
                childSizesIrregular[3].width / 2
        );
    });

    it("correctly calculates snap offset, left aligned (regular)", () => {
        const first = calculateNearestSnapPoint(0, childSizes, 0);
        const second = calculateNearestSnapPoint(300, childSizes, 0);
        const third = calculateNearestSnapPoint(309, childSizes, 0);
        const fourth = calculateNearestSnapPoint(600, childSizes, 0);

        expect(first.scrollAmount).toEqual(0);
        expect(first.index).toEqual(0);
        expect(second.scrollAmount).toEqual(306);
        expect(second.index).toEqual(1);
        expect(third.scrollAmount).toEqual(306);
        expect(third.index).toEqual(1);
        expect(fourth.scrollAmount).toEqual(612);
        expect(fourth.index).toEqual(2);
    });

    it("correctly calculates snap offset, left aligned (irregular)", () => {
        const first = calculateNearestSnapPoint(0, childSizesIrregular, 0);
        const second = calculateNearestSnapPoint(100, childSizesIrregular, 0);
        const third = calculateNearestSnapPoint(319, childSizesIrregular, 0);
        const fourth = calculateNearestSnapPoint(600, childSizesIrregular, 0);

        expect(first.scrollAmount).toEqual(0);
        expect(first.index).toEqual(0);
        expect(second.scrollAmount).toEqual(106);
        expect(second.index).toEqual(1);
        expect(third.scrollAmount).toEqual(312);
        expect(third.index).toEqual(2);
        expect(fourth.scrollAmount).toEqual(618);
        expect(fourth.index).toEqual(3);
    });

    it("correctly calculates snap offset, centre aligned", () => {
        const first = calculateNearestSnapPoint(0, childSizes, 300);
        const second = calculateNearestSnapPoint(300, childSizes, 300);
        const third = calculateNearestSnapPoint(309, childSizes, 300);
        const fourth = calculateNearestSnapPoint(600, childSizes, 300);
        const fifth = calculateNearestSnapPoint(830, childSizes, 300);

        expect(first.scrollAmount).toEqual(-300 + childSizes[0].width / 2);
        expect(second.scrollAmount).toEqual(
            -300 + 306 + childSizes[1].width / 2
        );
        expect(third.scrollAmount).toEqual(
            -300 + 306 + childSizes[1].width / 2
        );
        expect(fourth.scrollAmount).toEqual(
            -300 + 612 + childSizes[2].width / 2
        );
        expect(fifth.scrollAmount).toEqual(
            -300 + 918 + childSizes[3].width / 2
        );
    });

    it("returns the same result for index and position, left aligned", () => {
        const snap1 = calculateNearestSnapPoint(0, childSizes, 0);
        const snap2 = calculateNearestSnapPoint(300, childSizes, 0);
        const snap3 = calculateNearestSnapPoint(409, childSizes, 0);
        const snap4 = calculateNearestSnapPoint(500, childSizes, 0);
        const snap5 = calculateNearestSnapPoint(850, childSizes, 0);
        const index1 = calculateScrollOffsetForIndex(0, childSizes, 0);
        const index2 = calculateScrollOffsetForIndex(1, childSizes, 0);
        const index3 = calculateScrollOffsetForIndex(2, childSizes, 0);
        const index4 = calculateScrollOffsetForIndex(3, childSizes, 0);

        expect(snap1.scrollAmount).toEqual(index1);
        expect(snap1.index).toEqual(0);
        expect(snap1.scrollAmount).toEqual(combineWidths(childSizes, 0, false));
        expect(snap2.scrollAmount).toEqual(index2);
        expect(snap2.index).toEqual(1);
        expect(snap2.scrollAmount).toEqual(combineWidths(childSizes, 1, false));
        expect(snap3.scrollAmount).toEqual(index2);
        expect(snap3.index).toEqual(1);
        expect(snap3.scrollAmount).toEqual(combineWidths(childSizes, 1, false));
        expect(snap4.scrollAmount).toEqual(index3);
        expect(snap4.index).toEqual(2);
        expect(snap4.scrollAmount).toEqual(combineWidths(childSizes, 2, false));
        expect(snap5.scrollAmount).toEqual(index4);
        expect(snap5.index).toEqual(3);
        expect(snap5.scrollAmount).toEqual(combineWidths(childSizes, 3, false));
    });

    it("returns the same result for index and position, centre aligned (regular)", () => {
        const snap1 = calculateNearestSnapPoint(0, childSizes, 300);
        const snap2 = calculateNearestSnapPoint(300, childSizes, 300);
        const snap3 = calculateNearestSnapPoint(409, childSizes, 300);
        const snap4 = calculateNearestSnapPoint(500, childSizes, 300);
        const snap5 = calculateNearestSnapPoint(850, childSizes, 300);
        const snap6 = calculateNearestSnapPoint(309, childSizes, 300);
        const index1 = calculateScrollOffsetForIndex(0, childSizes, 300);
        const index2 = calculateScrollOffsetForIndex(1, childSizes, 300);
        const index3 = calculateScrollOffsetForIndex(2, childSizes, 300);
        const index4 = calculateScrollOffsetForIndex(3, childSizes, 300);

        expect(snap1.scrollAmount).toEqual(index1);
        expect(snap1.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 0, true)
        );
        expect(snap1.index).toEqual(0);

        expect(snap2.scrollAmount).toEqual(index2);
        expect(snap2.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 1, true)
        );
        expect(snap2.index).toEqual(1);

        expect(snap3.scrollAmount).toEqual(index2);
        expect(snap3.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 1, true)
        );
        expect(snap3.index).toEqual(1);

        expect(snap4.scrollAmount).toEqual(index3);
        expect(snap4.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 2, true)
        );
        expect(snap4.index).toEqual(2);

        expect(snap5.scrollAmount).toEqual(index4);
        expect(snap5.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 3, true)
        );
        expect(snap5.index).toEqual(3);

        expect(snap6.scrollAmount).toEqual(index2);
        expect(snap6.scrollAmount).toEqual(
            -300 + combineWidths(childSizes, 1, true)
        );
        expect(snap6.index).toEqual(1);
    });

    xit("returns the same result for index and position, centre aligned (irregular)", () => {
        const snap1 = calculateNearestSnapPoint(0, childSizesIrregular, 300);
        const snap2 = calculateNearestSnapPoint(100, childSizesIrregular, 300);
        const snap3 = calculateNearestSnapPoint(319, childSizesIrregular, 300);
        const snap4 = calculateNearestSnapPoint(500, childSizesIrregular, 300);
        const snap5 = calculateNearestSnapPoint(650, childSizesIrregular, 300);
        const index1 = calculateScrollOffsetForIndex(
            0,
            childSizesIrregular,
            300
        );
        const index2 = calculateScrollOffsetForIndex(
            1,
            childSizesIrregular,
            300
        );
        const index3 = calculateScrollOffsetForIndex(
            2,
            childSizesIrregular,
            300
        );
        const index4 = calculateScrollOffsetForIndex(
            3,
            childSizesIrregular,
            300
        );

        expect(snap1.scrollAmount).toEqual(index1);
        expect(snap1.index).toEqual(0);
        expect(snap1.scrollAmount).toEqual(
            -300 + childSizesIrregular[0].width / 2
        );
        expect(snap1.scrollAmount).toEqual(
            -300 + combineWidths(childSizesIrregular, 0, true)
        );
        expect(snap2.scrollAmount).toEqual(index2);
        expect(snap2.index).toEqual(1);
        expect(snap2.scrollAmount).toEqual(
            -300 +
                childSizesIrregular[0].width +
                childSizesIrregular[1].width / 2
        );
        expect(snap2.scrollAmount).toEqual(
            -300 + combineWidths(childSizesIrregular, 1, true)
        );
        expect(snap3.scrollAmount).toEqual(index3);
        expect(snap3.index).toEqual(2);
        expect(snap3.scrollAmount).toEqual(
            -300 + combineWidths(childSizesIrregular, 2, true)
        );
        expect(snap4.scrollAmount).toEqual(index4);
        expect(snap4.index).toEqual(3);
        expect(snap4.scrollAmount).toEqual(
            -300 + combineWidths(childSizesIrregular, 3, true)
        );
        expect(snap4.scrollAmount).toEqual(-300 + 106 + 206 + 306 + 406 / 2);
        expect(snap5.scrollAmount).toEqual(index4);
        expect(snap5.index).toEqual(3);
        expect(snap5.scrollAmount).toEqual(
            -300 + combineWidths(childSizesIrregular, 3, true)
        );
    });
});
