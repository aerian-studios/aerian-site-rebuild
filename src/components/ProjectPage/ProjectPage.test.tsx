import * as React from "react";

import * as renderer from "react-test-renderer";

import { project, projectBox } from "../../types/fixtures";
import { ProjectPage } from "./index";

const projects = [{ node: projectBox }];

describe("ProjectPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ProjectPage project={project} allProjects={projects} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
