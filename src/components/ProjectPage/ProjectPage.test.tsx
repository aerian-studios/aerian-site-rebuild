/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router";
import { project } from "../../types/fixtures";
import { ProjectPage } from "./index";

describe("ProjectPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <ProjectPage project={project} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
