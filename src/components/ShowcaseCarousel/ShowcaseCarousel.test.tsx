/// <reference types="@types/jest" />
import * as React from "react";
import * as renderer from "react-test-renderer";
import { project } from "../../types/fixtures";
import { Image } from "../Image";
import { ShowcaseCarousel } from "./index";

(global as any).IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe("ShowcaseCarousel", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ShowcaseCarousel>
                    {[<Image key={1} source={project.heroImage} />]}
                </ShowcaseCarousel>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
