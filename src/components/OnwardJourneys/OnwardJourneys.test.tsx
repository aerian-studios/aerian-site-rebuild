import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { OnwardJourneys } from "./index";

describe("OnwardJourneys", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<OnwardJourneys projectURL={project.externalUrl} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
