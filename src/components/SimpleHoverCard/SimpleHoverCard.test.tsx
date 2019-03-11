/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { SimpleHoverCard } from "./index";
import { projectBox } from "../../types/fixtures";

describe("SimpleHoverCard", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <SimpleHoverCard className="myClass" project={projectBox} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
