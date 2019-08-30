import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { Gallery } from "./index";

describe("Gallery", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<Gallery gallery={project.gallery} className="myClass" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
