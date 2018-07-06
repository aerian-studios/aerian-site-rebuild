/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { project } from "../../types/fixtures";
import { ShowcaseCarousel } from "./index";

describe("ShowcaseCarousel", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(<ShowcaseCarousel projects={[project]} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
