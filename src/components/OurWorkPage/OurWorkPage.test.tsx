/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as renderer from "react-test-renderer";
import { about, projectBox } from "../../types/fixtures";
import { OurWorkPage } from "./index";

(global as any).IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe("OurWorkPage", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<OurWorkPage projects={[projectBox]} page={about} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
