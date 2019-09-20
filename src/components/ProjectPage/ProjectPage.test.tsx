import * as React from "react";

import * as renderer from "react-test-renderer";

import { project, projects } from "../../types/fixtures";
import { ProjectPage } from "./index";

describe("ProjectPage", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<ProjectPage project={project} allProjects={projects} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
