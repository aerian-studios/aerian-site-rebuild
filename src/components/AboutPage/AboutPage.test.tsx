/// <reference types="@types/jest" />
import * as React from "react";

import * as renderer from "react-test-renderer";

import { MemoryRouter } from "react-router";
import { about, client } from "../../types/fixtures";
import { AboutPage } from "./index";

describe("AboutPage", () =>
    it("renders correctly", () => {
        const tree = renderer
            .create(
                <MemoryRouter>
                    <AboutPage page={about} clients={[client]} />
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    }));
