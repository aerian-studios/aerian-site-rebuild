/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { RevealCard } from "./index";

describe("RevealCard", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<RevealCard className="myClass" project={project} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
