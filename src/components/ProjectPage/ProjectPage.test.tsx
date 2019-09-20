import * as React from "react";

import * as renderer from "react-test-renderer";

import { project, projectBox } from "../../types/fixtures";
import { ProjectPage } from "./index";

describe("ProjectPage", () => {
    xit("renders correctly", () => {
        const tree = renderer
            .create(<ProjectPage project={project} allProjects={[projects]} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
