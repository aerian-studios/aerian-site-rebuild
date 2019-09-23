/// <reference types="@types/jest" />
import * as React from "react";
import * as renderer from "react-test-renderer";
import { SlidingCarouselProvider } from "./index";

const els = [
    <p key="1">Test 1</p>,
    <p key="2">Test 2</p>,
    <p key="3">Test 3</p>
];

describe("SlidingCarouselProvider", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SlidingCarouselProvider carouselLabel="SUT">
                    {els}
                </SlidingCarouselProvider>
            )
            .toJSON();

        expect(tree!.children[0]!.children[0]!.children.length).toEqual(
            els.length
        );
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with infinite set", () => {
        const tree = renderer
            .create(
                <SlidingCarouselProvider infinite={true} carouselLabel="SUT">
                    {els}
                </SlidingCarouselProvider>
            )
            .toJSON();

        expect(tree!.children[0]!.children[0]!.children.length).toEqual(
            els.length * 3
        );
        expect(tree).toMatchSnapshot();
    });

    it("renders correctly with center set", () => {
        const tree = renderer
            .create(
                <SlidingCarouselProvider center={true} carouselLabel="SUT">
                    {els}
                </SlidingCarouselProvider>
            )
            .toJSON();

        expect(tree!.children[0]!.children[0]!.children.length).toEqual(
            els.length
        );
        expect(tree).toMatchSnapshot();
    });
    it("renders correctly with center and infinite set", () => {
        const tree = renderer
            .create(
                <SlidingCarouselProvider
                    center={true}
                    infinite={true}
                    carouselLabel="SUT"
                >
                    {els}
                </SlidingCarouselProvider>
            )
            .toJSON();

        expect(tree!.children[0]!.children[0]!.children.length).toEqual(
            els.length * 3
        );
        expect(tree).toMatchSnapshot();
    });
});
