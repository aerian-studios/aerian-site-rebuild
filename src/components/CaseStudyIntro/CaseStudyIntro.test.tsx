import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { CaseStudyIntro } from "./index";

describe("CaseStudyIntro", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<CaseStudyIntro project={project} className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
