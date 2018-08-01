/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router-dom";
import { whatWeDo } from "../../types/fixtures";
import { WhatWeDoPage } from "./index";

describe("WhatWeDoPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <WhatWeDoPage page={whatWeDo} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
