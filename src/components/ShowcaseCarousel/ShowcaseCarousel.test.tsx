/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as renderer from "react-test-renderer";
import { ProjectBox } from "../../types/data";
import { projectBox } from "../../types/fixtures";
import { RevealCard } from "../RevealCard";
import { ShowcaseCarousel } from "./index";
import { useStaticQuery } from "gatsby";
import { mockTweet } from "../../lib/twitter.test";

(global as any).IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

const projects: ProjectBox[] = [projectBox];

describe("ShowcaseCarousel", () => {
    beforeEach(() => {
        (useStaticQuery as jest.Mock).mockReturnValue({ tweet: mockTweet });
    });
    it("renders correctly", () => {
        const tree = renderer
            .create(<ShowcaseCarousel data={projects} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders handles intersection", () => {
        const entry = {
            isIntersecting: true
        };

        const tree = renderer.create(<ShowcaseCarousel data={projects} />);

        const spy = jest.fn();
        tree.root.findByType(RevealCard).instance.setVisible = spy;
        const instance = tree.getInstance() as any;
        instance.handleChange(entry, 0);

        expect(spy).toHaveBeenCalledWith(true);
    });
});
