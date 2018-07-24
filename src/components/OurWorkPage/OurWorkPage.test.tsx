/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router";
import { about, project } from "../../types/fixtures";
import { OurWorkPage } from "./index";

(global as any).IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe("OurWorkPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <OurWorkPage projects={[project]} page={about} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
