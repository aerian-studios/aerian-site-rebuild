/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { OnwardJournies } from "./index";

describe("OnwardJournies", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<OnwardJournies projectURL={project.externalUrl} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
