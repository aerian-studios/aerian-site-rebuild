import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { ProjectPage } from "./index";

describe("ProjectPage", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<ProjectPage project={project} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
