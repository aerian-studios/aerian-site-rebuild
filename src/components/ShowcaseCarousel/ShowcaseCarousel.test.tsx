/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router";
import { project } from "../../types/fixtures";
import { ShowcaseCarousel } from "./index";

describe("ShowcaseCarousel", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <ShowcaseCarousel projects={[project]} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
