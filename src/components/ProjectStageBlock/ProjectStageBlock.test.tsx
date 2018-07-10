/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { projectStage } from "../../types/fixtures";
import { ProjectStageBlock } from "./index";

describe("ProjectStageBlock", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <ProjectStageBlock title="Stage" projectStage={projectStage} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
